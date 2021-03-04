import Grid from '@material-ui/core/Grid'

const Header = () => {
    return (
        <div>
            <Grid item md={12} xl={12} className="titleSection">
                <h1 className="pageTitle">My awesome shopping site</h1>
                <p className="pageDescription">Mens's t-shirt, sweatshirt</p>
            </Grid>
        </div>
    )
}

export default Header;