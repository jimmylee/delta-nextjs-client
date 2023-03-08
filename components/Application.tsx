'use client';

import styles from '@components/Application.module.scss';

import * as React from 'react';

import PackageJSON from '@root/package.json';
import DefaultLayout from '@components/DefaultLayout';

import SceneDatasets from '@components/SceneDatasets';
import SceneProviders from '@components/SceneProviders';
import SceneReplications from '@components/SceneReplications';
import SceneWallets from '@components/SceneWallets';

import FormUploadData from '@components/FormUploadData';
import FormAddWallet from '@components/FormAddWallet';

import { navigationStates, tooltipStates } from '@root/common/navigation';

export default function Application(props) {
  const [appNavigationState, setAppNavigationState] = React.useState(1);
  const [searchValue, setSearchChange] = React.useState('');
  const [providerValue, setProviderChange] = React.useState('');
  const [selectedProvider, setSelectedProvider] = React.useState('');
  const [selectedData, setSelectedData] = React.useState('');
  const [state, setState] = React.useState({ datasets: [], providers: [], replications: [] });
  const [appTooltipState, setAppTooltipState] = React.useState(0);

  async function updateState() {
    const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1314/api/v1";
    const datasetsRes = await fetch(apiURL + "/dataset");
    const providersRes = await fetch(apiURL + "/providers");

    setState({
      datasets: await datasetsRes.json(),
      providers: await providersRes.json(),
      replications: []
    });
  }

  function dismissTooltip() {
    setAppTooltipState(0);
  }

  React.useEffect(() => {
    updateState();
  }, []);

  return (
    <DefaultLayout
      appTitle={PackageJSON.name}
      appVersion={PackageJSON.version}
      appNavigationState={appNavigationState}
      appTooltipState={appTooltipState}
      onClickDatasets={() => setAppNavigationState(navigationStates.datasets)}
      onClickProviders={() => setAppNavigationState(navigationStates.providers)}
      onClickReplications={() => setAppNavigationState(navigationStates.replications)}
      onUploadData={() => setAppTooltipState(tooltipStates.uploadData)}
      onImportData={() => alert('work in progress')}
      onAddProviders={() => alert('work in progress')}
      onClickWallets={() => setAppNavigationState(navigationStates.wallets)}
      onAddWallet={() => setAppTooltipState(tooltipStates.addWallet)}
    >
      {appNavigationState === navigationStates.datasets && (
        <SceneDatasets
          onSearchChange={(e) => setSearchChange(e.target.value)}
          searchValue={searchValue}
          searchLabel="Search your DDM"
          placeholder="(example: university-bird-sounds.zip)"
          state={state}
        />
      )}
      {appNavigationState === navigationStates.providers && (
        <SceneProviders
          onProviderChange={(e) => setProviderChange(e.target.value)}
          providerChange={providerValue}
          providerLabel="Search your providers"
          placeholder="(example: f0123456)"
          state={state}
        />
      )}
      {appNavigationState === navigationStates.replications && (
        <SceneReplications
          selectedProvider={selectedProvider}
          setSelectedProvider={() => {
            alert('test');
          }}
          selectedData={selectedData}
          setSelectedData={() => { }}
          state={state}
        />
      )}
      {appNavigationState === navigationStates.wallets && (
        <SceneWallets />
      )}

      {appTooltipState === tooltipStates.uploadData && (
        <FormUploadData
          onOutsideClick={dismissTooltip}
          updateState={updateState}
        />
      )}
      {appTooltipState === tooltipStates.addWallet && (
        <FormAddWallet onOutsideClick={dismissTooltip} />
      )}
    </DefaultLayout>
  );
}
