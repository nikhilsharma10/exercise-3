import Header from './Header'
import { CartProvider } from './CartContext'
import Grid from '@material-ui/core/Grid'

const CustomLayout = ({children}) => {
    return (
        <div>
            <main>
                <Grid item>
                    <Header />
                    <CartProvider>
                        {children}
                    </CartProvider>
                </Grid>
            </main>
        </div>
    )
}

export default CustomLayout;