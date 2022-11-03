import { Box, Button, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { editCategory, addCategory } from '../../redux/categorySlice';
import { editBanner, addBanner } from '../../redux/bannerSlice';
import { useNavigate } from "react-router-dom";

const TableHeader = ({ handleModalOpen, parent }) => {

    const dispatch = useDispatch();
    const resetCategory = useSelector((state) => state.categoryReducer.reset);
    const resetBanner = useSelector((state) => state.bannerReducer.reset);

    let navigate = useNavigate();

    const addItem = () => {
        switch (parent) {
            case 'Categories':
                dispatch(editCategory(resetCategory));
                dispatch(addCategory());
                break;

            case 'Banners':
                dispatch(editBanner(resetBanner));
                dispatch(addBanner());
                break;

            case 'Products':
                navigate("/dashboard/addProduct")
                break;

            default:
                break;
        }
    }

    let title = "";
    if (parent === "Categories") {
        title = 'category';
    } else {
        title = parent.slice(0, parent.length - 1);
    }

    return (
        <Box className="tableheader">
            <Box className="title">
                <p>
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        {parent}
                    </Typography>
                </p>
            </Box>
            <Box className="serchbox"
                sx={{ width: '100%' }}>
                <Tooltip title="Search Data" arrow>
                    <input
                        type="text"
                        placeholder="Search"
                    />
                </Tooltip>
            </Box>
            <Box sx={{ width: '70%' }}>
                <Button id="addProdBtn2"
                    onClick={() => {
                        addItem();
                        handleModalOpen();
                    }}>
                    Add new {title}
                </Button>
            </Box>
        </Box>
    );
};

export default TableHeader;
