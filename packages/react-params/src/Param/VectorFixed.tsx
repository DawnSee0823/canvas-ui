// Copyright 2017-2021 @polkadot/react-params authors & contributors
// and @canvas-ui/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0

import getInitValue from '@canvas-ui/react-components/Params/initValue';
import { ParamDef, Props, RawParam } from '@canvas-ui/react-components/types';
import { useApi } from '@canvas-ui/react-hooks';
import React, { useEffect, useState } from 'react';

import { isUndefined } from '@polkadot/util';

import Base from './Base';
import Params from './Params';
import useParamDefs from './useParamDefs';

function generateParam ([{ name, type }]: ParamDef[], index: number): ParamDef {
  return {
    name: `${index}: ${name || type.type}`,
    type
  };
}

function VectorFixed ({ className = '', defaultValue, isDisabled = false, label, onChange, overrides, type, withLabel }: Props): React.ReactElement<Props> | null {
  const inputParams = useParamDefs(type);
  const [params, setParams] = useState<ParamDef[]>([]);
  const [values, setValues] = useState<RawParam[]>([]);
  const { api } = useApi();

  // build up the list of parameters we are using
  useEffect((): void => {
    if (inputParams.length) {
      const count = (inputParams[0].length || 1);
      const max = isDisabled ? (defaultValue.value as RawParam[] || []).length : count;
      const params: ParamDef[] = [];

      for (let index = 0; index < max; index++) {
        params.push(generateParam(inputParams, index));
      }

      setParams(params);
    }
  }, [defaultValue, isDisabled, inputParams]);

  // when !isDisable, generating an input list based on count
  useEffect((): void => {
    !isDisabled && inputParams.length &&
      setValues((values): RawParam[] => {
        const count = (inputParams[0].length || 1);

        if (values.length === count) {
          return values;
        }

        while (values.length < count) {
          const value = getInitValue(api.registry, inputParams[0].type);

          values.push({ isValid: !isUndefined(value), value });
        }

        return values.slice(0, count);
      });
  }, [inputParams, isDisabled, api.registry]);

  // when isDisabled, set the values based on the defaultValue input
  useEffect((): void => {
    isDisabled &&
      setValues(
        (defaultValue.value as RawParam[] || []).map((value: RawParam) =>
          isUndefined(value) || isUndefined(value.isValid)
            ? { isValid: !isUndefined(value), value }
            : value
        )
      );
  }, [defaultValue, isDisabled]);

  // when our values has changed, alert upstream
  useEffect((): void => {
    onChange && onChange({
      isValid: values.reduce((result: boolean, { isValid }) => result && isValid, true),
      value: values.map(({ value }) => value)
    });
  }, [values, onChange]);

  return (
    <Base
      className={className}
      isOuter
      label={label}
      withLabel={withLabel}
    >
      <Params
        isDisabled={isDisabled}
        onChange={setValues}
        overrides={overrides}
        params={params}
        registry={api.registry}
        values={values}
      />
    </Base>
  );
}

export default React.memo(VectorFixed);
