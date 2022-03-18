<script>
  import { usersStore } from './users-store.js'
  import { goto } from '$app/navigation'

  let error = null
  let userTypes = [
    'Wykładowca',
    'Pracownik administracyjny'
  ]

  let name = ''
  let surname = ''
  let email = ''
  let password = ''
  let userType = ''
  let phone = ''
  let education = ''

  let correspondenceAddress = {
    voivodship: '', 
    city: '', 
    code: '', 
    street: '', 
    number: '' 
  }
  let residenceAddress = {
    voivodship: '', 
    city: '', 
    code: '', 
    street: '', 
    number: '' 
  }
  
  let resetForm = e => {
    name = ''
    surname = ''
    email = ''
    password = ''
    userType = ''
    phone = ''
    education = ''

    correspondenceAddress = {
      voivodship: '', 
      city: '', 
      code: '', 
      street: '', 
      number: '' 
    }
    residenceAddress = {
      voivodship: '', 
      city: '', 
      code: '', 
      street: '', 
      number: '' 
    }
  }

  let handleSubmit = e => {
    let user = {}
    if (name == '' || surname == '' || email == '' || password == '' || userType == '') {
      error = 'Uzupełnij *wymagane pola'
    } else {
      error = false
      if (userType === 'Wykładowca') {
        user = {
          name,
          surname,
          email,
          password,
          userType,
          phone,
          education
        }
      }
      if (userType === 'Pracownik administracyjny') {
        user = {
          name,
          surname,
          email,
          password,
          userType,
          correspondenceAddress,
          residenceAddress
        }
      }
    }

    if (error === false && user !== {}) post(user)
  }

  let post = async data => {
    goto('get-users')
    let response = await fetch(`./add-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
    })
    let result = await response.json()

    if (result.auth) {
      info = result.auth
    } else {
      usersStore.update(store => store = [result, ...store])
      resetForm()
    }
  }
</script>

<form class="add-user" on:submit|preventDefault={handleSubmit}>
  <label><div>Imię *</div>
    <input type="text" bind:value={name}>
  </label>
  <label><div>Nazwisko *</div>
    <input type="text" bind:value={surname}>
  </label>
  <label><div>Email *</div>
    <input type="email" bind:value={email}>
  </label>
  <label><div>Hasło *</div>
    <input type="password" bind:value={password}>
  </label>
  <label><div>Typ użytkownika *</div>
    <select bind:value={userType}>
      {#each userTypes as userType}
        <option value={userType}>{userType}</option>
      {/each}
    </select>
  </label>

  {#if userType === 'Wykładowca'}
  <label><div>Telefon</div>
    <input type="tel" bind:value={phone}>
  </label>
  <label><div>Wykształcenie</div>
    <input type="text" bind:value={education}>
  </label>
  {/if}

  {#if userType === 'Pracownik administracyjny'}
  <h6>Adres korespondencyjny</h6>
  <label><div>Województwo</div>
    <input type="text" bind:value={correspondenceAddress.voivodship}>
  </label>
  <label><div>Miasto</div>
    <input type="text" bind:value={correspondenceAddress.city}>
  </label>
  <label><div>Kod pocztowy</div>
    <input type="text" bind:value={correspondenceAddress.code}>
  </label>
  <label><div>Ulica</div>
    <input type="text" bind:value={correspondenceAddress.street}>
  </label>
  <label><div>Numer</div>
    <input type="text" bind:value={correspondenceAddress.number}>
  </label>
  <h6>Adres zamieszkania</h6>
  <label><div>Województwo</div>
    <input type="text" bind:value={residenceAddress.voivodship}>
  </label>
  <label><div>Miasto</div>
    <input type="text" bind:value={residenceAddress.city}>
  </label>
  <label><div>Kod pocztowy</div>
    <input type="text" bind:value={residenceAddress.code}>
  </label>
  <label><div>Ulica</div>
    <input type="text" bind:value={residenceAddress.street}>
  </label>
  <label><div>Numer</div>
    <input type="text" bind:value={residenceAddress.number}>
  </label>
  {/if}
  <br>
  <input type="submit" value="Dodaj użytkownika">
</form>

<div class="error">
  {#if error}
    {error}
  {/if}
</div>

<style>
  input, select {
    width: 20rem;
    padding: 1rem;
    margin: 1rem 0;
    background: #eee;
    width: 100%;
  }
  h6 {
    font-size: 2rem;
    padding: 3rem 0 1.5rem 0;
    font-weight: 300;
  }

  input[type="submit"] {
    margin: 1rem 0 5rem 0;
  }

  @media (min-width: 640px) {
    input, select {
      margin: 0;
      width: 30rem;
    }
    label {
      display: flex;
      align-items: center;
      padding: 1rem;
    }
      label > div {
        width: 20rem;
      }
  }
</style>