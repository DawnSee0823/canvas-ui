// Copyright 2017-2020 @polkadot/app-settings authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { TFunction } from 'i18next';
import { UseEndpoints } from '@polkadot/react-hooks/types';

import React, { useMemo } from 'react';
import { createEndpoints } from '@polkadot/apps-config/settings';

export default function useEndpointOptions ({ isCustom, url }: UseEndpoints, t: TFunction, useShortText?: boolean): React.ReactNode[] {
  return useMemo(
    () => ([
      ...createEndpoints(t).map(({ shortText, text, value }) => ({
        key: value,
        text: (
          <div className='chain-option'>
            {useShortText ? shortText : text}
          </div>
        ),
        value
      })),
      ...(
        isCustom
          ? [{
            key: url,
            text: (
              <div className='chain-option'>
                {t('Custom Node')}
              </div>
            ),
            value: url
          }]
          :[]
      )
    ]),
    [isCustom, t, url]
  );
}
