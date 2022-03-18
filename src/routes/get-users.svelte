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
    usersStore.update(store => store = [ ...store, ...result])
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
      console.log('textToSearch', textToSearch)
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
  <label><div>Szukaj</div>
    <input type="text" bind:value={textToSearch} on:keyup={e => searchText(e.target.value)}>
  </label>
</form>

{#if nameAscendingOrder}
  <button 
    on:click={() => { changeSort(0, 10, -1, 'name'); nameAscendingOrder = false; nameSortActiveLabel = true; surnameSortActiveLabel = false }} 
    class={nameSortActiveLabel ? 'active': ''}
  >▲ Sortuj po imieniu rosnąco</button>
{/if}
{#if !nameAscendingOrder}
  <button 
    on:click={() => { changeSort(0, 10, 1, 'name'); nameAscendingOrder = true; nameSortActiveLabel = true; surnameSortActiveLabel = false }} 
    class={nameSortActiveLabel ? 'active': ''}
  >▼ Sortuj po imieniu malejąco</button>
{/if}

{#if surnameAscendingOrder}
  <button 
    on:click={() => { changeSort(0, 10, -1, 'surname'); surnameAscendingOrder = false; nameSortActiveLabel = false; surnameSortActiveLabel = true }} 
    class={surnameSortActiveLabel ? 'active': ''}
  >▲ Sortuj po nazwisku rosnąco</button>
{/if}
{#if !surnameAscendingOrder}
  <button 
    on:click={() => { changeSort(0, 10, 1, 'surname'); surnameAscendingOrder = true; nameSortActiveLabel = false; surnameSortActiveLabel = true }} 
    class={surnameSortActiveLabel ? 'active': ''}
  >▼ Sortuj po nazwisku malejąco</button>
{/if}

{#each $usersStore as user, i}
  <div>
    {++i}: {JSON.stringify(user)}
  </div>
{/each}


<style>
  button {
    opacity: 0.6
  }
  .active {
    opacity: 1
  }
</style>
