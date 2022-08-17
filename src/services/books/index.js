const searchBook = async (keyword) => {
    try {
        const resp = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}`);
        const json = await resp.json();
        if (json?.error) {
            throw new Error(json);
        }
        const data = normalizedBook(json);
        return data;
    } catch(err) {
        throw new Error(err);
    }
};

const wishlist = async (payload) => {
    try {
        const resp = await fetch(`${process.env.REACT_APP_SERVICE_URL}/wishlist/upsert`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(payload)
        });
        const json = await resp.json();
        if (json?.error) {
            throw new Error(json);
        }
        return json;
    } catch(err) {
        throw new Error(err);
    }
}

const getWishlist = async (userID) => {
    try {
        const resp = await fetch(`${process.env.REACT_APP_SERVICE_URL}/wishlist/${userID}`);
        const json = await resp.json();
        if (json?.error) {
            throw new Error(json);
        }

        return json;
    } catch(err) {
        throw new Error(err);
    }
}
const normalizedBook = ({ items }) => {
    if (items?.length > 0) {
        let normalizedBook = items.map(item => {
            const { averageRating, imageLinks, authors, publisher, title } = item.volumeInfo;
            return {
                book_id: item.id, 
                title: title,
                thumbnail: imageLinks?.smallThumbnail,
                author: authors?.length > 0 ? authors[0] : publisher,
                rating: averageRating || 0,
            }
        });

        return normalizedBook;
    }

    return []
};
export { searchBook, wishlist, getWishlist };