<template>
    <nav class="navbar">
        <div class="navbar-left">
            <div class="search-box">
                <input type="text" placeholder="Search" class="search-input">
                <span class="search-hint">(ctrl + "/" to focus)</span>
            </div>
        </div>
        <div class="navbar-right">
            <a href="#" class="nav-link">Docs</a>
            <a href="#" class="nav-link">Pricing</a>
            <a href="#" class="nav-link">Support</a>
            <a href="#" class="nav-link">Services</a>
            <a href="#" class="nav-link">Learn</a>
            <a href="#" class="nav-link">
                <i class="fab fa-github"></i>
            </a>
            <button class="login-btn">LOGIN</button>
        </div>
    </nav>
</template>

<script>
export default {
    name: "navbar"
}
</script>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1.5rem;
    background: white;
    border-bottom: 1px solid #eee;
}

.navbar-left {
    display: flex;
    align-items: center;
}

.search-box {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.search-input {
    padding: 0.5rem 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    width: 240px;
    font-size: 0.875rem;
}

.search-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
}

.search-hint {
    color: #718096;
    font-size: 0.75rem;
}

.navbar-right {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.nav-link {
    color: #4a5568;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
}

.nav-link:hover {
    color: #2b6cb0;
}

.login-btn {
    padding: 0.5rem 1rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
}

.login-btn:hover {
    background: #2563eb;
}
</style>