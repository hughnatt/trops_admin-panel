import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getAdvert, deleteAdvert } from './adverts.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IAdvertsDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UserManagementDeleteDialog = (props: IAdvertsDeleteDialogProps) => {
  useEffect(() => {
    props.getAdvert(props.match.params.id);
  }, []);

  const handleClose = event => {
    event.stopPropagation();
    props.history.push('/admin/adverts');
  };

  const confirmDelete = event => {
    props.deleteAdvert(props.advert._id);
    handleClose(event);
  };

  const { advert } = props;

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody>
        <Translate contentKey="adverts.delete.question">
          Are you sure you want to delete this advert?
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
  advert: storeState.adverts.advert
});

const mapDispatchToProps = { getAdvert, deleteAdvert };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementDeleteDialog);
