// Copyright 2017-2021 @polkadot/react-components authors & contributors
// and @canvas-ui/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { encodeTypeDef } from '@polkadot/types';
import { Registry } from '@polkadot/types/types';

import Data from './Data';
import { BareProps, ParamDef } from './types';

interface Props extends BareProps {
  arg?: ParamDef;
  param?: unknown;
  registry?: Registry;
}

function MessageArg ({ arg, param, registry }: Props): React.ReactElement<Props> | null {
  if (!arg) {
    return null;
  }

  return (
    <>
      {arg.name && (
        <>
          {arg.name}
          {': '}
        </>
      )}
      <span>
        {param
          ? <b>
            <Data
              registry={registry}
              type={arg.type}
              value={param}
            />
          </b>
          : registry && encodeTypeDef(registry, arg.type)
        }
      </span>
    </>
  );
}

export default React.memo(MessageArg);
