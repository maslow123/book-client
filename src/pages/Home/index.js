import React, { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Card } from '../../components/Card';
import { getWishlist, searchBook, wishlist } from './../../services';

export default function Home() {
    const [books, setBooks] = useState(null);
    const [wishList, setWishList] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [page, setPage] = useState('all');

    useEffect(() => {
        const timeout = setTimeout(() => onSearch(query), 500);
        return () => clearTimeout(timeout);
    }, [query]);

    useEffect(() => {
        const getWishlistData = async () => {
            await fetchWishlist();
        }

        getWishlistData();
    }, []);

    const fetchWishlist = async () => {
        const wishListData = await getWishlist('11111')
        setWishList(wishListData.results);
    }
    const onSearch = async (keyword) => {
        try {
            setLoading(true);
            let data = await searchBook(keyword);
            
            if (data?.length < 1) {
                setNotFound(true);
            } else {
                data = setBookIsWishlist(data);
                setNotFound(false);
            }
            
            setBooks(data);
            setLoading(false);
            
        } catch(err) {
            setBooks([]);
            setLoading(false);
            setNotFound(false);
        }
    };

    const setBookIsWishlist = (books) => {
        if (wishList.length > 0) {
            for(let bookWL of wishList) {
                for (let [index, book] of books.entries()) {
                    if (bookWL.book_id === book.book_id) {
                        books[index].wishlist = true;                        
                    }
                }
            }
        }

        return books
    }

    const doWishlist = async (book) => {        
        const filterWishlist = (wishList, bookID) => {
            const currentWishList = wishList.filter(item => item.book_id !== bookID);
            setWishList([...currentWishList]);                        
        };

        setLoading(true);
        const resp = await wishlist(book);
        if (resp.code === 200) {
            const id = resp.results.book_id;
            let changeWishlist = false
            for (let [index, b] of books.entries()) {
                if (b.book_id === id) {
                    const changeWishlist = !books[index].wishlist;
                    books[index].wishlist = changeWishlist;

                    if (page === 'wishlist') {
                        filterWishlist(wishList, book.book_id);
                    }
                }
            }

            if (books.length < 1  && !changeWishlist && page === 'wishlist') {                
                filterWishlist(wishList, book.book_id);
            }
        }

        setBooks([...books]);
        setLoading(false);
    };

    const _changeTab = async (tab) => {
        setPage(tab);
        if (tab === 'wishlist') {
            setLoading(true);
            await fetchWishlist();
        }
        await onSearch(query);

        setLoading(false);

    }

    const mapping = page === 'all' ? books : wishList;
    const allPage = page === 'all' ? 'has-text-weight-bold' : '';
    const wishlistPage = page === 'wishlist' ? 'has-text-weight-bold' : '';

    return (
        <div className="container">
            <section className="hero">
                <div className="hero-body">
                    <p className="title">
                        Daftar Buku
                    </p>
                    <p className="subtitle">
                        <input type="text" className="input" placeholder='Cari buku...' onChange={e => setQuery(e.target.value)}/>
                    </p>
                    <article className="media">
                        <div className="media-left"></div>
                        <div className="media-content"></div>
                        <div className='media-right '>
                            <span onClick={() => _changeTab('all')} className={`${allPage} pr-3 is-clickable`}>SEMUA</span>
                            <span onClick={() => _changeTab('wishlist')} className={`${wishlistPage} is-clickable`}>WISHLIST</span>                            
                        </div>
                    </article>
                    {
                        loading
                        ? <div className="columns is-centered"><ThreeDots height={80} width={80} /></div>
                        : (
                            <article>
                            {
                            mapping?.length > 0 
                            ? mapping.map((book, k) => (
                                <Card
                                    key={k}
                                    book_id={book.book_id}
                                    author={book.author}
                                    title={book.title}
                                    rating={book.rating}
                                    thumbnail={book.thumbnail}
                                    doWishlist={doWishlist}   
                                    wishlist={page === 'wishlist' ? true : book?.wishlist}     
                                />                           
                            ))
                            : <span>{notFound ? 'Buku tidak ditemukan' : 'Silakan cari buku yang diinginkan'}</span>
                        }
                        </article>
                        )
                    }                    
                </div>
            </section>     
        </div>
    )
}