import React, { useEffect, useState } from "react";
import CustomCard from "../components/card/card";
import Header from "../components/header/header";
import PageLoader from "../components/pageloader/pageloader";
import Languages from "../fixtures/languages";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

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
      <main className="mt-[6rem] p-2">
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {Languages.map((lang, id) => (
              <Grid item xs={2} sm={4} md={4} key={`lang_${lang}_${id}`}>
                <CustomCard
                  title={lang.title}
                  image={lang.image}
                  alt={lang.alt}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </main>
    </div>
  );
}
