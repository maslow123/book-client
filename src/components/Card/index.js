import Rater from "react-rater";

export function Card(book) {
    let { title, author, thumbnail, rating, wishlist, doWishlist } = book;
    const payload = {
        ...book,
        user_id: '11111'
    }
    const isOutline = wishlist ? 'fas' : 'far';
    return (
        <div className="card mt-3">            
            <div className="card-content">
                <article className="media">
                    <figure className="media-left">
                        <p className="image">
                            <img src={thumbnail} className="image is-96x96"/>
                        </p>
                    </figure>
                    <div className="media-content">
                        <div className="content">
                            <p>
                                <strong>{title}</strong>
                                <br/>
                                {author}
                            </p>
                        </div>                        
                    </div>
                    <div className="media-right is-flex">
                        <span className="mb-3 mr-3">
                            <Rater total={5} rating={rating} interactive={false}/>
                        </span>
                        <span className="icon has-text-danger is-clickable" onClick={async () => await doWishlist(payload)}>
                            <i className={`${isOutline} fa-heart`}></i>
                        </span>
                    </div>                    
                </article>        
            </div>
      </div>
    )
}