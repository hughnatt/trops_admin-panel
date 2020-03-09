import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getCategory, deleteCategory } from './categories.reducer';
import { IRootState } from 'app/shared/reducers';

export interface ICategoriesDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CategoriesDeleteDialog = (props: ICategoriesDeleteDialogProps) => {
  useEffect(() => {
    props.getCategory(props.match.params.id);
  }, []);

  const handleClose = event => {
    event.stopPropagation();
    props.history.push('/admin/categories');
  };

  const confirmDelete = event => {
    props.deleteCategory(props.category._id);
    handleClose(event);
  };

  const { category } = props;

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody>
        <Translate contentKey="categories.delete.question">
          Are you sure you want to delete this category and its children?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  category: storeState.categories.category
});

const mapDispatchToProps = { getCategory, deleteCategory };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesDeleteDialog);
