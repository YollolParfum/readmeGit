async function updateReadme(option) {
    let content = '';
    switch (option) {
        case 1:
            content = '# Esta es la Opción 1\n\nContenido para la opción 1.';
            break;
        case 2:
            content = '# Esta es la Opción 2\n\nContenido para la opción 2.';
            break;
        case 3:
            content = '# Esta es la Opción 3\n\nContenido para la opción 3.';
            break;
        default:
            content = '# Presiona un botón para modificar el contenido del README.';
    }

    const token = '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'; // Agrega tu token de acceso de GitHub
    const repo = 'YollolParfum/readmeGit'; // Cambia esto por tu usuario/repo
    const path = 'README.md';
    const url = `https://api.github.com/repos/${repo}/contents/${path}`;

    try {
        // Obtener el SHA actual del archivo README
        const getResponse = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        const getData = await getResponse.json();

        // Actualizar el contenido del archivo README
        const updateResponse = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Actualizando README desde la web',
                content: btoa(content), // Codifica el contenido a base64
                sha: getData.sha
            })
        });

        const updateData = await updateResponse.json();
        document.getElementById('response').innerText = 'README actualizado exitosamente.';
    } catch (error) {
        console.error('Error al actualizar el README:', error);
        document.getElementById('response').innerText = 'Error al actualizar el README.';
    }
}
