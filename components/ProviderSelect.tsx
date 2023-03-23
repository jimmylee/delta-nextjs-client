import Select from '@components/Select';

export default function ProviderSelect(props) {
  return (
    <Select default='select a provider...' {...props}>
      {props.providers?.map((provider, i) => {
        return (
          <option value={provider.actor_id}>
            {provider.actor_id} {provider.actor_name && `(${provider.actor_name})`}
          </option>
        );
      })}
    </Select>
  );
}