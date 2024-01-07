import { Box, Skeleton } from "@mui/material";
const RequestsSkeleton = () => {
  return (
    <div className="flex gap-0 bg-white rounded-2xl shadow-customTwo mb-5">
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <Box>
          <Skeleton
            variant="rectangular"
            height={20}
            sx={{ borderRadius: "12px", width: { xs: "125px", md: "225px" } }}
          />
          <Skeleton
            variant="rectangular"
            height={20}
            sx={{
              borderRadius: "12px",
              marginY: "1rem",
              width: { xs: "200px", md: "300px" },
            }}
          />
          <Skeleton
            variant="rectangular"
            height={20}
            sx={{ borderRadius: "12px", width: { xs: "230px", md: "300px" } }}
          />
        </Box>
        <Box>
          <Skeleton
            variant="rectangular"
            height={20}
            sx={{ borderRadius: "12px", width: { xs: "100px", md: "150px" } }}
          />
          <Skeleton
            variant="rectangular"
            height={20}
            sx={{
              borderRadius: "12px",
              marginY: "1rem",
              width: { xs: "100px", md: "150px" },
            }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default RequestsSkeleton;
