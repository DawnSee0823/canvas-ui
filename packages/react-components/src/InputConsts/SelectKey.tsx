// Copyright 2017-2020 @canvas-ui/react-components authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { DropdownOptions } from '@canvas-ui/react-util/types';
import { BareProps } from '../types';
import { ConstValueBase } from './types';

import React from 'react';

import Dropdown from '../Dropdown';
import { classes } from '@canvas-ui/react-util';

interface Props extends BareProps {
  isError?: boolean;
  onChange: (value: ConstValueBase) => void;
  options: DropdownOptions;
  value: ConstValueBase;
}

function transform ({ value }: Props): (method: string) => ConstValueBase {
  return (method: string): ConstValueBase => {
    const section = value.section;

    return {
      method,
      section
    };
  };
}

function SelectKey (props: Props): React.ReactElement<Props> | null {
  const { className = '', isError, onChange, options, value } = props;

  if (!options.length) {
    return null;
  }

  return (
    <Dropdown
      className={classes('ui--DropdownLinked-Items', className)}
      isError={isError}
      onChange={onChange}
      options={options}
      transform={transform(props)}
      value={value.method}
      withLabel={false}
    />
  );
}

export default React.memo(SelectKey);
