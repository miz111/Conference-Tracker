function createCard(name, description, pictureUrl, eventStart, eventEnd, location) {
    return `

    <div class = "col-6 col-md-4">
        <div class = "w-100">
        <div class="card mb-3">
            <img src="${pictureUrl}" class="card-img-top">
            <div class="card-body shadow p-3 bg-white rounded">
            <h5 class="card-title">${name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
            <p class="card-text">${description}</p>
            <div class="card-footer text-muted">
            ${eventStart} - ${eventEnd}
            </div >
            </div >
        </div >
        </div >

    `;
}

function errorDetected() {
    return `
    <div class="alert alert-info" role="alert">
    Error: Unable to fetch and process data.
  </div>
    `
}


window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            // throw new Error('Response not ok');
            const html = errorDetected();
            const column = document.querySelector('.row');
            column.innerHTML += html;


            // Figure out what to do when the response is bad
        } else {
            const data = await response.json();

            for (let conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    const name = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;
                    const eventStart = new Date(details.conference.starts).toLocaleDateString();
                    const eventEnd = new Date(details.conference.ends).toLocaleDateString();
                    const location = details.conference.location.name;
                    const html = createCard(name, description, pictureUrl, eventStart, eventEnd, location);
                    const column = document.querySelector('.row');
                    column.innerHTML += html;
                }
            }


        }
    } catch (e) {
        // Figure out what to do if
        console.error('error', error);
        const html = errorDetected();
        const column = document.querySelector('.row');
        column.innerHTML += html;
    }

});

// window.addEventListener('DOMContentLoaded', async () => {

//     const url = 'http://localhost:8000/api/conferences/';

//     try {
//         const response = await fetch(url);

//         if (!response.ok) {
//             throw new Error('Response not ok');
//             // Figure out what to do when the response is bad
//         } else {
//             const data = await response.json();

//             const conference = data.conferences[0];
//             const nameTag = document.querySelector('.card-title');
//             nameTag.innerHTML = conference.name;

//             const detailUrl = `http://localhost:8000${conference.href}`;
//             const detailResponse = await fetch(detailUrl);
//             if (detailResponse.ok) {
//                 const details = await detailResponse.json();
//                 console.log(details);

//                 const conferenceDetail = details.conference;

//                 const detailTag = document.querySelector('.card-text');
//                 detailTag.innerHTML = conferenceDetail.description;
//                 console.log(details)
//                 const imageTag = document.querySelector('.card-img-top');
//                 imageTag.src = details.conference.location.picture_url;
//             }

//         }
//     } catch (e) {
//         console.error('error', error);
//         // Figure out what to do if an error is raised
//     }

// });
