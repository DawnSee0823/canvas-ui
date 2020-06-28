// Copyright 2017-2020 @polkadot/app-execute authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { AppProps as Props } from '@polkadot/react-components/types';

import React from 'react';
import { Route, Switch } from 'react-router';

import Add from './Add';
import Upload from './Upload';

function UploadApp ({ basePath }: Props): React.ReactElement<Props> {
  const componentProps = { basePath };

  return (
    <main className='upload--App'>
      <Switch>
        <Route path={`${basePath}/add`}>
          <Add {...componentProps} />
        </Route>
        <Route exact>
          <Upload {...componentProps} />
        </Route>
      </Switch>
    </main>
  );
}

// function ContractsApp ({ basePath, onStatusChange }: Props): React.ReactElement<Props> {
//   const { t } = useTranslation();
//   const { allAccounts } = useAccounts();
//   const { allContracts } = useContracts();
//   const [codeHash, setCodeHash] = useState<string | undefined>();
//   const [constructorIndex, setConstructorIndex] = useState(0);
//   const [isDeployOpen, toggleIsDeployOpen, setIsDeployOpen] = useToggle();
//   const [updated, setUpdated] = useState(0);

//   const [allCodes, setAllCodes] = useState(store.getAllCode());

//   const _triggerUpdate = useCallback(
//     (): void => {
//       setUpdated(Date.now());
//       setAllCodes(store.getAllCode());
//     },
//     []
//   );

//   const _onShowDeploy = useCallback(
//     (codeHash?: string, constructorIndex = 0): () => void =>
//       (): void => {
//         setCodeHash(codeHash || (allCodes && allCodes[0] ? allCodes[0].json.codeHash : undefined));
//         setConstructorIndex(constructorIndex);
//         toggleIsDeployOpen();
//       },
//     [allCodes, toggleIsDeployOpen]
//   );

//   const componentProps = useMemo(
//     (): ComponentProps => ({
//       accounts: allAccounts,
//       basePath,
//       contracts: allContracts,
//       hasCode: store.hasCode,
//       onShowDeploy: _onShowDeploy,
//       onStatusChange,
//       updated
//     }),
//     [allAccounts, allContracts, basePath, _onShowDeploy, onStatusChange, updated]
//   );

//   useEffect(
//     (): void => {
//       store.on('new-code', _triggerUpdate);
//       store.on('removed-code', _triggerUpdate);

//       store.loadAll()
//         .then((): void => setAllCodes(store.getAllCode()))
//         .catch((): void => {
//           // noop, handled internally
//         });
//     },
//     [_triggerUpdate]
//   );

//   const hidden: string[] = [];

//   const _onCloseDeploy = (): void => setIsDeployOpen(false);

//   return (
//     <main className='contracts--App'>
//       <HelpOverlay md={introMd as string} />
//       <header>
//         <Tabs
//           basePath={basePath}
//           hidden={hidden}
//           items={[
//             {
//               name: 'code',
//               text: 'Code'
//             },
//             {
//               isRoot: true,
//               name: 'contracts',
//               text: 'Contracts'
//             }
//           ].map((tab): TabItem => ({ ...tab, text: t(tab.text) }))
//           }
//         />
//       </header>
//       <Switch>
//         <Route path={`${basePath}/code`}>
//           <Codes {...componentProps} />
//         </Route>
//         <Route exact>
//           <Contracts {...componentProps} />
//         </Route>
//       </Switch>
//       {codeHash && (
//         <Deploy
//           allCodes={allCodes}
//           basePath={basePath}
//           codeHash={codeHash}
//           constructorIndex={constructorIndex}
//           isOpen={isDeployOpen}
//           onClose={_onCloseDeploy}
//           setCodeHash={setCodeHash}
//           setConstructorIndex={setConstructorIndex}
//         />
//       )}
//     </main>
//   );
// }

export default React.memo(UploadApp);
