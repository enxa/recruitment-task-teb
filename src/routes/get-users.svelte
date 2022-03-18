<script>
  import { onMount } from 'svelte'
  import { usersStore } from './users-store.js'
  
  let nameAscendingOrder = true
  let surnameAscendingOrder = true
  let nameSortActiveLabel = true
  let surnameSortActiveLabel = false

  let query = new URLSearchParams()

  let skip = 0
  let limit = 2
  let sortType = 1
  let valueToSort = 'surname'
  
  let loadMore = async (skip, limit, sortType, valueToSort) => {
    query.set('limit', String(limit))
    query.set('skip', String(skip * limit))
    query.set('sort-type', String(sortType))
    query.set('value-to-sort', String(valueToSort))
    
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
    loadMore(skip, limit, sortType, valueToSort)
  }

  let changeSort = (changeSkip, changeLimit, changeSortType, changeValueToSort) => {
    skip = changeSkip
    limit = changeLimit
    sortType = changeSortType
    valueToSort = changeValueToSort
    usersStore.set([])
    loadMore(skip, limit, sortType, valueToSort)
  }

  onMount(() => {
    usersStore.set([])
    loadMore(skip, limit, sortType, valueToSort)
  })
</script>

<svelte:window on:wheel={handleWheel}/>

{#if nameAscendingOrder}
  <button 
    on:click={() => { changeSort(0, 2, -1, 'name'); nameAscendingOrder = false; nameSortActiveLabel = true; surnameSortActiveLabel = false }} 
    class={nameSortActiveLabel ? 'active': ''}
  >Sortuj po imieniu rosnąco</button>
{/if}
{#if !nameAscendingOrder}
  <button 
    on:click={() => { changeSort(0, 2, 1, 'name'); nameAscendingOrder = true; nameSortActiveLabel = true; surnameSortActiveLabel = false }} 
    class={nameSortActiveLabel ? 'active': ''}
  >Sortuj po imieniu malejąco</button>
{/if}

{#if surnameAscendingOrder}
  <button 
    on:click={() => { changeSort(0, 2, -1, 'surname'); surnameAscendingOrder = false; nameSortActiveLabel = false; surnameSortActiveLabel = true }} 
    class={surnameSortActiveLabel ? 'active': ''}
  >Sortuj po nazwisku rosnąco</button>
{/if}
{#if !surnameAscendingOrder}
  <button 
    on:click={() => { changeSort(0, 2, 1, 'surname'); surnameAscendingOrder = true; nameSortActiveLabel = false; surnameSortActiveLabel = true }} 
    class={surnameSortActiveLabel ? 'active': ''}
  >Sortuj po nazwisku malejąco</button>
{/if}

{#each $usersStore as user}
  <div>
    {JSON.stringify(user)}
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
