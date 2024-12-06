import { Link } from "react-router-dom";
import { shopRoutes } from '@packages/shared/src/route/shop';


const Shop = () => {
    return (
        <>
            <h1>Shop</h1>
            <div>
                <Link to={shopRoutes.second}>Second Page</Link>
            </div>

        </>
    )
}

export default Shop;