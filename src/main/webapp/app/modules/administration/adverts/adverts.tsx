import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge } from 'reactstrap';
import { Translate, TextFormat, JhiPagination, JhiItemCount, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { getAdverts, updateAdvert } from './adverts.reducer';
import { IRootState } from 'app/shared/reducers';

export interface IAdvertsProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export const Adverts = (props: IAdvertsProps) => {
  const [pagination, setPagination] = useState(getSortState(props.location, ITEMS_PER_PAGE));

  useEffect(() => {
    const sortOrder = (pagination.order === 'asc' ? 1 : -1); 
    props.getAdverts(pagination.activePage - 1, pagination.itemsPerPage, `${pagination.sort},${sortOrder}`);
    props.history.push(`${props.location.pathname}?page=${pagination.activePage}&sort=${pagination.sort},${pagination.order}`);
  }, [pagination]);

  const sort = p => () =>
    setPagination({
      ...pagination,
      order: pagination.order === 'asc' ? 'desc' : 'asc',
      sort: p
    });

  const handlePagination = currentPage =>
    setPagination({
      ...pagination,
      activePage: currentPage
    });

  const { adverts, account, match, totalItems } = props;
  return (
    <div>
      <h2 id="adverts-page-heading">
        <Translate contentKey="adverts.home.title">Adverts</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity">
          <FontAwesomeIcon icon="plus" /> <Translate contentKey="adverts.home.createLabel">Create a new advert</Translate>
        </Link>
      </h2>
      <Table responsive striped>
        <thead>
          <tr>
            <th className="hand" onClick={sort('_id')}>
              <Translate contentKey="global.field.id">ID</Translate>
              <FontAwesomeIcon icon="sort" />
            </th>
            <th className="hand" onClick={sort('title')}>
              <Translate contentKey="adverts.title">Title</Translate>
              <FontAwesomeIcon icon="sort" />
            </th>
            <th className="hand" onClick={sort('description')}>
              <Translate contentKey="adverts.description">Description</Translate>
              <FontAwesomeIcon icon="sort" />
            </th>
            <th className="hand" onClick={sort('price')}>
              <Translate contentKey="adverts.price">Price</Translate>
              <FontAwesomeIcon icon="sort" />
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {adverts.map((advert, i) => (
            <tr id={advert._id} key={`advert-${i}`}>
              <td>
                <Button tag={Link} to={`${match.url}/${advert._id}`} color="link" size="sm">
                  {advert._id}
                </Button>
              </td>
              <td>{advert.title}</td>
              <td>{advert.description}</td>
              <td>{advert.price}</td>
            
              <td className="text-right">
                <div className="btn-group flex-btn-group-container">
                  <Button tag={Link} to={`${match.url}/${advert._id}`} color="info" size="sm">
                    <FontAwesomeIcon icon="eye" />{' '}
                    <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.view">View</Translate>
                    </span>
                  </Button>
                  <Button tag={Link} to={`${match.url}/${advert._id}/edit`} color="primary" size="sm">
                    <FontAwesomeIcon icon="pencil-alt" />{' '}
                    <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.edit">Edit</Translate>
                    </span>
                  </Button>
                  <Button
                    tag={Link}
                    to={`${match.url}/${advert._id}/delete`}
                    color="danger"
                    size="sm"
                  >
                    <FontAwesomeIcon icon="trash" />{' '}
                    <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.delete">Delete</Translate>
                    </span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className={adverts && adverts.length > 0 ? '' : 'd-none'}>
        <Row className="justify-content-center">
          <JhiItemCount page={pagination.activePage} total={totalItems} itemsPerPage={pagination.itemsPerPage} i18nEnabled />
        </Row>
        <Row className="justify-content-center">
          <JhiPagination
            activePage={pagination.activePage}
            onSelect={handlePagination}
            maxButtons={5}
            itemsPerPage={pagination.itemsPerPage}
            totalItems={props.totalItems}
          />
        </Row>
      </div>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  adverts: storeState.adverts.adverts,
  totalItems: storeState.adverts.totalItems,
  account: storeState.authentication.account
});

const mapDispatchToProps = { getAdverts, updateAdvert };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Adverts);
