$(document).ready(function () {
    cargarUsuarios(paginador);
});

$('#prevPage').click(function () {
    if (paginador > 1) {
        paginador--;
        cargarUsuarios(paginador);
    }
});

$('#nextPage').click(function () {
    if (paginador < paginas) {
        paginador++;
        cargarUsuarios(paginador);
    }
});

let paginador = 1;
let paginas = 1;
let columna = '';
let orden = 'asc';
let usuarios = [];

function cargarUsuarios(page) {
    $('#loader').show();
    $('#userTableBody').html('');

    $.ajax({
        url: `/listaUsuarios?page=${page}`,
        method: 'GET',
        dataType: 'json',
        success: function (datos) {
            usuarios = datos.data;
            paginas = datos.total_pages;

            crearTabla(usuarios);
        },
        error: function (e) {
            console.error('Error al obtener los datos:', e);
        }
    });
}

function crearTabla(users) {
    let html = '';
    
    if (columna) {
        users.sort((a, b) => {
            let valueA = (columna === 'name') ? `${a.first_name} ${a.last_name}` : a[columna];
            let valueB = (columna === 'name') ? `${b.first_name} ${b.last_name}` : b[columna];

            if (valueA < valueB) return (orden === 'asc') ? -1 : 1;
            if (valueA > valueB) return (orden === 'asc') ? 1 : -1;
            return 0;
        });
    }

    users.forEach(user => {
        html += `
            <tr onclick='detalleUsuario(${JSON.stringify(user)})'>
                <td>${user.id}</td>
                <td>${user.first_name} ${user.last_name}</td>
                <td>${user.email}</td>
                <td>
                    <img src="${user.avatar}" alt="${user.first_name}" class="rounded-circle" width="50">
                </td>
            </tr>
        `;
    });

    if (users.length === 0) {
        html = `
            <tr>
                <td colspan="4" class="text-center text-muted">No se encontraron resultados</td>
            </tr>
        `;
    }

    $('#loader').fadeOut();
    $('#userTableBody').fadeIn().html(html);
}

function buscarUsuarios() {
    let query = $('#searchInput').val().toLowerCase();

    let resultados = usuarios.filter(user =>
        (`${user.first_name} ${user.last_name}`.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query))
    );

    crearTabla(resultados);
}

function ordenarUsuarios(column) {
    if (columna === column) {
        orden = (orden === 'asc') ? 'desc' : 'asc';
    } else {
        columna = column;
        orden = 'asc';
    }

    $('#sort-id, #sort-name, #sort-email').html('');

    let arrow = (orden === 'asc') ? '▲' : '▼';
    $(`#sort-${column}`).html(arrow);

    cargarUsuarios(paginador);
}

function exportarCSV() {
    if (usuarios.length === 0) {
        console.error("No hay datos para exportar.");
        return;
    }

    let csv = 'ID,Nombre,Email\n';

    usuarios.forEach(user => {
        let fullName = `${user.first_name} ${user.last_name}`;
        let row = `${user.id},"${fullName}","${user.email}"`;
        csv += row + '\n';
    });

    let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    let url = URL.createObjectURL(blob);
    
    let link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'lista_usuarios.csv');
    document.body.appendChild(link);
    link.click();
}

function detalleUsuario(user) {
    $('#modalId').text(user.id);
    $('#modalName').text(`${user.first_name} ${user.last_name}`);
    $('#modalEmail').text(user.email);
    $('#modalAvatar').attr('src', user.avatar);

    let userModal = new bootstrap.Modal(document.getElementById('userModal'));
    userModal.show();
}



