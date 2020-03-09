import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Badge } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { languages } from 'app/config/translation';
import { getCategory } from './categories.reducer';
import { IRootState } from 'app/shared/reducers';

export interface ICategoriesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CategoriesDetail = (props: ICategoriesDetailProps) => {
  useEffect(() => {
    props.getCategory(props.match.params.id);
  }, []);

  const { category } = props;

  return (
    <div>
      <h2>
        <Translate contentKey="categories.detail.title">Category</Translate> [<b>{category.name}</b>]
      </h2>
      <Row size="md">
        <dl className="jh-entity-details">
          <dt>
            <Translate contentKey="global.field.id">ID</Translate>
          </dt>
          <dd>{category._id}</dd>
          <dt>
            <Translate contentKey="categories.name">Name</Translate>
          </dt>
          <dd>{category.name}</dd>
          <dt>
            <Translate contentKey="categories.description">Description</Translate>
          </dt>
          <dd>{category.description}</dd>
          <dt>
            <Translate contentKey="categories.thumbnail">Thumbnail</Translate>
          </dt>
          <dd>{category.thumbnail}</dd>
        </dl>
      </Row>
      <Button tag={Link} to="/admin/categories" replace color="info">
        <FontAwesomeIcon icon="arrow-left" />{' '}
        <span className="d-none d-md-inline">
          <Translate contentKey="entity.action.back">Back</Translate>
        </span>
      </Button>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  category: storeState.categories.category
});

const mapDispatchToProps = { getCategory };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesDetail);
