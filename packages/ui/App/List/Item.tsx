import * as React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Checkbox,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { ListItemType } from 'services/types';
import { useEditItemMutation, useDeleteItemMutation } from 'services/queries';
import AddEditItem from 'App/List/AddEditItem';

const Item = ({ item }: { item: ListItemType }) => {
  const [editItem, editItemStatus] = useEditItemMutation();
  const [deleteItem, deleteItemStatus] = useDeleteItemMutation();

  const isLoading = editItemStatus.isLoading || deleteItemStatus.isLoading;

  const handlePurchase = React.useCallback(() => {
    editItem({ _id: item._id, purchased: !item.purchased });
  }, [editItem, item._id, item.purchased]);

  const handleDelete = React.useCallback(() => {
    deleteItem({ _id: item._id });
  }, [deleteItem, item._id]);

  return (
    <ListItem
      button
      onClick={handlePurchase}
      sx={(theme) => ({
        border: `0.5px solid ${theme.palette.divider}`,
        borderRadius: '4px',
        minHeight: 87,
        mt: 1.5,
        backgroundColor: item.purchased
          ? 'rgba(213, 223, 233, 0.17)'
          : 'inherit',
      })}
    >
      <ListItemIcon>
        {editItemStatus.isLoading ? (
          <CircularProgress />
        ) : (
          <Checkbox
            sx={{ color: '#C6C6C6' }}
            checked={item.purchased}
            onChange={handlePurchase}
          />
        )}
      </ListItemIcon>
      <ListItemText
        primary={item.name}
        secondary={item.description}
        primaryTypographyProps={{
          fontSize: 16,
          fontWeight: 600,
          color: item.purchased ? '#4D81B7' : 'inherit',
          style: {
            textDecorationLine: item.purchased ? 'line-through' : 'none',
          },
        }}
        secondaryTypographyProps={{
          fontSize: 14,
          fontWeight: 600,
          color: '#7D7A7A',
          style: {
            textDecorationLine: item.purchased ? 'line-through' : 'none',
          },
        }}
      />
      <ListItemSecondaryAction>
        <AddEditItem component={IconButton} item={item} disabled={isLoading}>
          <EditOutlined />
        </AddEditItem>
        <IconButton onClick={handleDelete} disabled={isLoading}>
          {deleteItemStatus.isLoading ? (
            <CircularProgress />
          ) : (
            <DeleteOutlined />
          )}
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Item;
