import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { locales, languages } from 'app/config/translation';
import { getAdvert, updateAdvert, createAdvert, reset } from './adverts.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IAdvertsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AdvertsUpdate = (props: IAdvertsUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getAdvert(props.match.params.id);
    }
    return () => props.reset();
  }, []);

  const handleClose = () => {
    props.history.push('/admin/adverts');
  };

  const saveAdvert = (event, values) => {
    if (isNew) {
      props.createAdvert(values);
    } else {
      props.updateAdvert(values);
    }
    handleClose();
  };

  const isInvalid = false;
  const { advert, loading, updating } = props;

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1>
            <Translate contentKey="adverts.home.createOrEditLabel">Create or edit an advert</Translate>
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm onValidSubmit={saveAdvert}>
              {advert._id ? (
                <AvGroup>
                  <Label for="id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvField type="text" className="form-control" name="_id" required readOnly value={advert._id} />
                </AvGroup>
              ) : null}
              <AvGroup>
                <AvField
                  type="text"
                  className="form-control"
                  label={translate('adverts.form.title.label')}
                  placeholder={translate('adverts.form.title.placeholder')}
                  name="title"
                  value={advert.title}
                />
              </AvGroup>
              <AvGroup>
                <AvField
                  name="description"
                  label={translate('adverts.form.description.label')}
                  placeholder={translate('adverts.form.description.placeholder')}
                  type="description"
                  value={advert.description}
                />
              </AvGroup>
              <Button tag={Link} to="/admin/adverts" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" type="submit" disabled={isInvalid || updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  advert: storeState.adverts.advert,
  loading: storeState.adverts.loading,
  updating: storeState.adverts.updating
});

const mapDispatchToProps = { getAdvert, updateAdvert, createAdvert, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AdvertsUpdate);
