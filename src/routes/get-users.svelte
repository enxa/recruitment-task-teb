<script>
  import { onMount } from 'svelte'
  import { usersStore } from './users-store.js'
  
  let nameAscendingOrder = true
  let surnameAscendingOrder = true
  let nameSortActiveLabel = true
  let surnameSortActiveLabel = false

  let query = new URLSearchParams()

  let skip = 0
  let limit = 10
  let sortType = 1
  let valueToSort = 'surname'
  let textToSearch = ''
  let debounceTimer
  
  let loadMore = async (skip, limit, sortType, valueToSort, textToSearch) => {
    query.set('limit', String(limit))
    query.set('skip', String(skip * limit))
    query.set('sort-type', String(sortType))
    query.set('value-to-sort', String(valueToSort))
    query.set('text-to-search', String(textToSearch))
    
    let response = await fetch(`./get-users?${query.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    let result = await response.json()
    if (result) usersStore.update(store => store = [ ...store, ...result])
  }

  let handleWheel = e => {
    if (e.deltaY >= 0) ++skip <= 0 ? skip = 0 : skip
    loadMore(skip, limit, sortType, valueToSort, textToSearch)
  }

  let changeSort = (changeSkip, changeLimit, changeSortType, changeValueToSort) => {
    skip = changeSkip
    limit = changeLimit
    sortType = changeSortType
    valueToSort = changeValueToSort
    usersStore.set([])
    loadMore(skip, limit, sortType, valueToSort, textToSearch)
  }

  let searchText = (changeTextToSearch) => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      skip = 0
      textToSearch = changeTextToSearch
      usersStore.set([])
      changeSort(skip, limit, sortType, valueToSort, textToSearch)
    }, 500)
  }
  
  onMount(() => {
    usersStore.set([])
    loadMore(skip, limit, sortType, valueToSort, textToSearch)
  })
</script>

<svelte:window on:wheel={handleWheel}/>

<form on:submit|preventDefault>
  <label class="search">
    <div class="search-label">Szukaj: </div>
    <input class="search-input" type="text" placeholder="Imię lub nazwisko" bind:value={textToSearch} on:keyup={e => searchText(e.target.value)}>
  </label>
</form>

<div class="sort">
  {#if nameAscendingOrder}
    <button class="{nameSortActiveLabel ? 'active': ''} name-sort-active-label"
      on:click={() => { changeSort(0, 10, -1, 'name'); nameAscendingOrder = false; nameSortActiveLabel = true; surnameSortActiveLabel = false }} 
    >▲ Sortuj po imieniu rosnąco</button>
  {/if}
  {#if !nameAscendingOrder}
    <button class="{nameSortActiveLabel ? 'active': ''} name-sort-active-label"
      on:click={() => { changeSort(0, 10, 1, 'name'); nameAscendingOrder = true; nameSortActiveLabel = true; surnameSortActiveLabel = false }} 
    >▼ Sortuj po imieniu malejąco</button>
  {/if}

  {#if surnameAscendingOrder}
    <button class="{surnameSortActiveLabel ? 'active': ''} surname-sort-active-label"
      on:click={() => { changeSort(0, 10, -1, 'surname'); surnameAscendingOrder = false; nameSortActiveLabel = false; surnameSortActiveLabel = true }} 
    >▲ Sortuj po nazwisku rosnąco</button>
  {/if}
  {#if !surnameAscendingOrder}
    <button class="{surnameSortActiveLabel ? 'active': ''} surname-sort-active-label"
      on:click={() => { changeSort(0, 10, 1, 'surname'); surnameAscendingOrder = true; nameSortActiveLabel = false; surnameSortActiveLabel = true }} 
    >▼ Sortuj po nazwisku malejąco</button>
  {/if}
</div>

<div class="users">
  {#each $usersStore as user, i}
    <div class="user">
      <div class="number">{++i}:</div>
      <div class="name">{user.name}</div>
      <div class="surname">{user.surname}</div>
      <div class="user-type">{user.userType}</div>
    </div>
  {/each}
</div>

<style>
  .search-input {
    padding: 1rem;
    margin: 1rem 0;
    border: 1px solid #808080;
  }
  .name-sort-active-label, .surname-sort-active-label {
    opacity: 0.4;
    padding: 1rem;
    margin: 1rem 0;
  }
  .active {
    opacity: 1
  }
  .users {
    padding-bottom: 5rem;;
  }

  @media (min-width: 960px)  {
    .search-label {
      text-align: right;
      align-self: center;
    }

    .user, .sort, .search {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      align-items: center;
      gap: 1rem;
      padding: 1rem;
    }
      .number {
        grid-column: 1/2;
        color: #808080
      }
      .name, .name-sort-active-label, .search-label {
        grid-column: 2/6;
      }
      .surname, .surname-sort-active-label, .search-input {
        grid-column: 6/10;
      }
      .user-type {
        grid-column: 10/13;
        color: #808080
      }
  }
</style>
