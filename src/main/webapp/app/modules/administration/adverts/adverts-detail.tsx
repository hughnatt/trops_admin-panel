import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Badge } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { languages } from 'app/config/translation';
import { getAdvert } from './adverts.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IAdvertsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AdvertsDetail = (props: IAdvertsDetailProps) => {
  useEffect(() => {
    props.getAdvert(props.match.params.id);
  }, []);

  const { advert } = props;

  return (
    <div>
      <h2>
        <Translate contentKey="adverts.detail.title">Advert</Translate> [<b>{advert.title}</b>]
      </h2>
      <Row size="md">
        <dl className="jh-entity-details">
          <dt>
            <Translate contentKey="global.field.id">ID</Translate>
          </dt>
          <dd>{advert._id}</dd>
          <dt>
            <Translate contentKey="adverts.title">Title</Translate>
          </dt>
          <dd>{advert.title}</dd>
          <dt>
            <Translate contentKey="adverts.description">Description</Translate>
          </dt>
          <dd>{advert.description}</dd>
          <dt>
            <Translate contentKey="adverts.price">Price</Translate>
          </dt>
          <dd>{advert.price}</dd>
        </dl>
      </Row>
      <Button tag={Link} to="/admin/adverts" replace color="info">
        <FontAwesomeIcon icon="arrow-left" />{' '}
        <span className="d-none d-md-inline">
          <Translate contentKey="entity.action.back">Back</Translate>
        </span>
      </Button>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  advert: storeState.adverts.advert
});

const mapDispatchToProps = { getAdvert };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AdvertsDetail);
