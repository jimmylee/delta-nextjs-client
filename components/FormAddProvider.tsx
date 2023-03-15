import Dismissible from '@components/Dismissible';
import styles from '@components/FormAddProvider.module.scss';
import Button from '@components/Button';
import Input from '@components/Input';

import React from 'react';
import { addProvider } from '@data/api';

export default function FormAddProvider(props) {

  let [providerID, setProviderID] = React.useState('');
  let [providerName, setProviderName] = React.useState('');
  let [error, setError] = React.useState('');

  async function onSubmit(e) {
    e.preventDefault();

    try {
      await addProvider(providerID, providerName);
    } catch (e) {
      setError(e.toString());
    }

    props.updateState();
  }

  return (<Dismissible className={styles.body} onOutsideClick={props.onOutsideClick}>
    <h2 className={styles.heading}>Add provider</h2>
    <form onSubmit={onSubmit}>
      <Input
        label="Provider ID"
        id="provider-id"
        onChange={e => setProviderID(e.target.value)}
        autoFocus
        autoComplete='new-password'
        placeholder='example: f012345'
        spellCheck='false'
      />
      <Input
        type="text"
        id="provider-name"
        label="Provider Name"
        onChange={e => setProviderName(e.target.value)}
        placeholder="a friendly name"
      />
      <Button disabled={!(providerID && providerName)}>Add</Button>
    </form>
    {error && <p className={styles.error}>{error}</p>}
  </Dismissible>)
}