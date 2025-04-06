import { Breadcrumbs, Link } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const MyBreadcrumbs = ({ data }) => {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {data?.map((d, index) => (
        <Link
        sx={{
            cursor: 'pointer',
            fontWeight: 500,
            textDecoration: 'underline',
            fontSize: '1.95rem',
            color: 'text.primary', // This sets a readable text color
            '&:hover': {
              color: 'primary.main',
            },
          }}
          key={index}
          underline="hover"
          color="inherit"
          href={d.link}
        >
          {d.label}
        </Link>
      ))}
    </Breadcrumbs>
  );
};

export default MyBreadcrumbs;
