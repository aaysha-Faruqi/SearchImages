const accessKey = '_4ZEh1LIZHqIrJJHGrj0ZAdEvpQ-Hqd2QQD4iFmCFSw';
let page = 1;

function searchImages() {
    const query = document.getElementById('searchInput').value.trim();
    if (query === '') {
        alert('Please enter a search term.');
        return;
    }
    page = 1; // Reset page number for new search
    fetchImages(query);
}

function fetchImages(query) {
    const url = `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=10&client_id=${accessKey}`;

    document.getElementById('loadingIndicator').style.display = 'block';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayImages(data.results);
            if (data.total_pages > page) {
                document.getElementById('showMoreBtn').style.display = 'block';
            } else {
                document.getElementById('showMoreBtn').style.display = 'none';
            }
            document.getElementById('loadingIndicator').style.display = 'none';
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            document.getElementById('loadingIndicator').style.display = 'none';
        });
}

function displayImages(images) {
    const container = document.getElementById('imageContainer');
    container.innerHTML = '';
    images.forEach(image => {
        const imageItem = document.createElement('div');
        imageItem.classList.add('imageItem');
        const img = document.createElement('img');
        img.src = image.urls.small;
        img.alt = image.alt_description;
        imageItem.appendChild(img);
        container.appendChild(imageItem);
    });
}

function showMore() {
    page++;
    const query = document.getElementById('searchInput').value.trim();
    fetchImages(query);
}
