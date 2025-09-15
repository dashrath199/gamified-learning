document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');
    const mobileLogoutBtn = document.getElementById('mobile-logout-btn');

    function handleLogout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/users/login/';
    }

    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    if (mobileLogoutBtn) mobileLogoutBtn.addEventListener('click', handleLogout);

    // Redirect to login if no token is found on a protected page
    const protectedPages = ['/dashboard', '/profile', '/leaderboard', '/games/'];
    if (protectedPages.some(path => window.location.pathname.includes(path))) {
        if (!localStorage.getItem('accessToken')) {
            window.location.href = '/users/login/';
        }
    }
});