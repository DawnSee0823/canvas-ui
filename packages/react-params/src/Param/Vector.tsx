// Copyright 2017-2021 @polkadot/react-params authors & contributors
// and @canvas-ui/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Button } from '@canvas-ui/react-components';
import getInitValue from '@canvas-ui/react-components/Params/initValue';
import { useTranslation } from '@canvas-ui/react-components/Params/translate';
import { ParamDef, Props, RawParam } from '@canvas-ui/react-components/types';
import { useApi } from '@canvas-ui/react-hooks';
import React, { useCallback, useEffect, useState } from 'react';

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

function Vector ({ className = '', defaultValue, isDisabled = false, label, onChange, overrides, type, withLabel }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const inputParams = useParamDefs(type);
  const [count, setCount] = useState(0);
  const [params, setParams] = useState<ParamDef[]>([]);
  const [values, setValues] = useState<RawParam[]>([]);
  const { api } = useApi();

  // build up the list of parameters we are using
  useEffect((): void => {
    if (inputParams.length) {
      const max = isDisabled ? (defaultValue.value as RawParam[] || []).length : count;
      const params: ParamDef[] = [];

      for (let index = 0; index < max; index++) {
        params.push(generateParam(inputParams, index));
      }

      setParams(params);
    }
  }, [count, defaultValue, isDisabled, inputParams]);

  // when !isDisable, generating an input list based on count
  useEffect((): void => {
    !isDisabled && inputParams.length &&
      setValues((values): RawParam[] => {
        if (values.length === count) {
          return values;
        }

        while (values.length < count) {
          const value = getInitValue(api.registry, inputParams[0].type);

          values.push({ isValid: !isUndefined(value), value });
        }

        return values.slice(0, count);
      });
  }, [count, inputParams, isDisabled, api.registry]);

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

  const _rowAdd = useCallback(
    (): void => setCount((count) => count + 1),
    []
  );
  const _rowRemove = useCallback(
    (): void => setCount((count) => count - 1),
    []
  );

  return (
    <Base
      className={className}
      isOuter
      label={label}
      withLabel={withLabel}
    >
      {!isDisabled && (
        <div className='ui--Param-Vector-buttons'>
          <Button
            icon='plus'
            label={t<string>('Add item')}
            onClick={_rowAdd}
          />
          <Button
            icon='minus'
            isDisabled={values.length === 0}
            label={t<string>('Remove item')}
            onClick={_rowRemove}
          />
        </div>
      )}
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

export default React.memo(Vector);
