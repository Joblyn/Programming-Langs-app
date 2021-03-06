import React, { useEffect, useState } from "react";
import CustomCard from "../components/card/card";
import Header from "../components/header/header";
import PageLoader from "../components/pageloader/pageloader";
import Languages from "../data/languages";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="mt-[6rem] p-2 max-width-[1250px] flex justify-center">
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {Languages.map((lang, id) => (
              <Grid
                item
                xs={4}
                sm={4}
                md={4}
                key={`lang_${lang}_${id}`}
                className="flex justify-center items-start"
              >
                <CustomCard
                  title={lang.title}
                  image={lang.image}
                  alt={lang.alt}
                  href={lang.href}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </main>
    </div>
  );
}
