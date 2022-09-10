import { Grid, Typography, List, CircularProgress } from '@mui/material';
import { useItemsQuery } from 'services/queries';
import { ListItemType } from 'services/types';
import Item from './Item';
import AddEditItem from './AddEditItem';

const ShoppingList = () => {
  const itemsQuery = useItemsQuery();

  return (
    <Grid
      container
      wrap="nowrap"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      {itemsQuery.isUninitialized || itemsQuery.isLoading ? (
        <CircularProgress size={76} sx={{ mt: 15.5 }} />
      ) : itemsQuery.data?.length ? (
        <>
          <Grid
            item
            container
            wrap="nowrap"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mt: 4.375 }}
          >
            <Typography sx={{ fontWeight: 600, fontSize: 18 }}>
              Your Items
            </Typography>
            <AddEditItem />
          </Grid>
          <List disablePadding sx={{ width: '100%' }}>
            {itemsQuery.data.map((item: ListItemType, index: number) => (
              <Item key={`shopping-list-item-${index}`} item={item} />
            ))}
          </List>
        </>
      ) : (
        <Grid
          container
          direction="column"
          wrap="nowrap"
          justifyContent="center"
          alignItems="center"
          sx={(theme) => ({
            width: 614,
            height: 290,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: '5px',
            mt: 15.5,
          })}
        >
          <Typography variant="h6" color="#87898C" sx={{ mb: 2 }}>
            Your shopping list is empty :(
          </Typography>
          <AddEditItem>Add your first item</AddEditItem>
        </Grid>
      )}
    </Grid>
  );
};

export default ShoppingList;
