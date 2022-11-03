
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';

const Breadcrumb = ({ parent }) => {
    console.log(parent, typeof parent)
    return (
        <Breadcrumbs
            sx={{ fontSize: "1.2rem", color: "#2c1762" }}
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
        >
            <Link underline="hover" key="1" color="inherit" href="$">
                Dashboard
            </Link>
            <Link
                underline="hover"
                key="2"
                color="inherit"
                href="categories"
            >
                {parent}
            </Link>
        </Breadcrumbs>
    )
}

export default Breadcrumb;