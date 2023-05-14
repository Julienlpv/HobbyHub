
export function fetchProtectedData() {
    const token = localStorage.getItem("authToken");
    console.log(token);
    return fetch('http://localhost:3000/protected-route', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    })
    .then(response => response.json())
    .catch((error) => {
        console.error('Error:', error);
    });
}
