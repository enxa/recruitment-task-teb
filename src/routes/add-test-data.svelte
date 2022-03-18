<script>
  import { goto } from '$app/navigation'

  let testData = 1

  $: testData <= 0 ? testData = '' : testData
  $: testData >= 100000 ? testData = 100000 : testData

  let post = async data => {
    goto('/get-users')
    let response = await fetch(`./add-test-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
    })
  }

  let del = async data => {
    goto('/get-users')
    let response = await fetch(`./add-test-data`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  }
</script>

<form on:submit|preventDefault>
  <label><div>Ilość danych testowych do wprowadzenia:</div>
    <input type="number" bind:value={testData}>
    <input type="submit" value="Dodaj dane testowe" on:click={post(testData)}>
    <input type="submit" value="Usuń wszystkie dane" on:click={del(testData)}>
  </label>
</form>

<style>
  input {
    display: block;
    padding: 1rem;
    margin: 1rem 0;
    width: 30rem;
  }
    input[type="number"] {
      border: 1px solid #808080;
    }
</style>