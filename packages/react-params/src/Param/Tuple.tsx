// Copyright 2017-2021 @polkadot/react-params authors & contributors
// and @canvas-ui/react-params authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Props, RawParam } from '@canvas-ui/react-components/types';
import { useApi } from '@canvas-ui/react-hooks';
import React, { useCallback } from 'react';

import Base from './Base';
import Params from './Params';
import Static from './Static';
import useParamDefs from './useParamDefs';

function Tuple (props: Props): React.ReactElement<Props> {
  const params = useParamDefs(props.type);
  const { className = '', isDisabled, label, onChange, overrides, withLabel } = props;
  const { api } = useApi();

  const _onChangeParams = useCallback(
    (values: RawParam[]): void => {
      onChange && onChange({
        isValid: values.reduce((result: boolean, { isValid }) => result && isValid, true),
        value: values.map(({ value }) => value)
      });
    },
    [onChange]
  );

  if (isDisabled) {
    return <Static {...props} />;
  }

  return (
    <div className='ui--Params-Tuple'>
      <Base
        className={className}
        label={label}
        withLabel={withLabel}
      />
      <Params
        onChange={_onChangeParams}
        overrides={overrides}
        params={params}
        registry={api.registry}
      />
    </div>
  );
}

export default React.memo(Tuple);
