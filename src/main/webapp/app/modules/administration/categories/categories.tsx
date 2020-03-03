import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge } from 'reactstrap';
import { Translate, TextFormat, JhiPagination, JhiItemCount, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { getCategories } from './categories.reducer';
import { IRootState } from 'app/shared/reducers';


export interface ICategoriesProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}


export const Categories = (props : ICategoriesProps) => {
  const [pagination, setPagination] = useState(getSortState(props.location, ITEMS_PER_PAGE));

  useEffect(() => {
    // props.getCategories(pagination.activePage - 1, pagination.itemsPerPage, `${pagination.sort},${pagination.order}`);
    // props.history.push(`${props.location.pathname}?page=${pagination.activePage}&sort=${pagination.sort},${pagination.order}`);
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

  const { categories, match, totalItems } = props;
  return (
    <div>
      <h2 id="categories-page-heading">
        <Translate contentKey="categories.home.title">Categories</Translate>
        {/* <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity">
          <FontAwesomeIcon icon="plus" /> <Translate contentKey="categories.home.createLabel">Create a new user</Translate>
        </Link> */}
      </h2>
      <Table responsive striped>
        <thead>
          <tr>
            <th className="hand" onClick={null}>
              <Translate contentKey="global.field.id">ID</Translate>
              <FontAwesomeIcon icon="sort" />
            </th>
            <th className="hand" onClick={null}>
              <Translate contentKey="categories.name">Name</Translate>
              <FontAwesomeIcon icon="sort" />
            </th>
            <th className="hand" onClick={null}>
              <Translate contentKey="categories.parent">Email</Translate>
              <FontAwesomeIcon icon="sort" />
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {categories.map((category, i) => (
            <tr id={category.id} key={`category-${i}`}>
              <td>
                <Button tag={Link} to={`${match.url}/${category.name}`} color="link" size="sm">
                  {category.id}
                </Button>
              </td>
              <td>{category.parent}</td>
              
              <td>{category.name}</td>

              <td className="text-right">
                <div className="btn-group flex-btn-group-container">
                  <Button tag={Link} to={`${match.url}/${category.name}`} color="info" size="sm">
                    <FontAwesomeIcon icon="eye" />{' '}
                    <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.view">View</Translate>
                    </span>
                  </Button>
                  <Button tag={Link} to={`${match.url}/${category.name}/edit`} color="primary" size="sm">
                    <FontAwesomeIcon icon="pencil-alt" />{' '}
                    <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.edit">Edit</Translate>
                    </span>
                  </Button>
                  <Button tag={Link} to={`${match.url}/${category.name}/delete`} color="danger"  size="sm">
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
      <div className={categories && categories.length > 0 ? '' : 'd-none'}>
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
}

const mapStateToProps = (storeState: IRootState) => ({
  categories: storeState.categories.categories,
  totalItems: storeState.categories.totalItems,
});

const mapDispatchToProps = { getCategories };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
