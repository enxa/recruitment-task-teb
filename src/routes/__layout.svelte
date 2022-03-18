<script>
	import '../app.css'
</script>

<nav>
	<a href="get-users">Lista użytkowników</a>
	<a href="add-user">Dodaj użytkownika</a>
	<a href="add-test-data">Dodaj/Usuń dane testowe</a>
</nav>


<main>
	<slot />
</main>

<style>
	nav {
		padding-top: 3rem;
		padding-bottom: 3rem;
		display: flex;
		justify-content: flex-end;
	}
		a {
			color: #000;
			padding: 1rem 2rem;
		}
</style>