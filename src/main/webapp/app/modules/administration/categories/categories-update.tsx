import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Row, Col, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { locales, languages } from 'app/config/translation';
import { getCategory, getCategories, updateCategory, createCategory, reset } from './categories.reducer';
import { IRootState } from 'app/shared/reducers';

export interface ICategoriesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CategoriesUpdate = (props: ICategoriesUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getCategory(props.match.params.id);
    }
    props.getCategories();
    return () => props.reset();
  }, []);

  const handleClose = () => {
    props.history.push('/admin/categories');
  };

  const saveCategory = (event, values) => {
    if (isNew) {
      props.createCategory(values);
    } else {
      props.updateCategory(values);
    }
    handleClose();
  };

  const isInvalid = false;
  const { categories, category, loading, updating } = props;

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1>
            <Translate contentKey="categories.home.createOrEditLabel">Create or edit a category</Translate>
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm onValidSubmit={saveCategory}>
              {category._id ? (
                <AvGroup>
                  <Label for="id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvField type="text" className="form-control" name="_id" required readOnly value={category._id} />
                </AvGroup>
              ) : null}
              <AvGroup>
                <AvField
                  name="name"
                  className="form-control"
                  label={translate('categories.form.name.label')}
                  placeholder={translate('categories.form.name.placeholder')}
                  type="text"
                  value={category.name}
                />
              </AvGroup>
              <AvGroup>
                <AvField
                  name="description"
                  label={translate('categories.form.description.label')}
                  placeholder={translate('categories.form.description.placeholder')}
                  type="description"
                  value={category.description}
                />
              </AvGroup>
          

              <AvGroup>
                  <AvField
                    name="parent"
                    className="form-control"
                    label={translate('categories.form.parent.label')}
                    placeholder={translate('categories.form.parent.placeholder')}
                    type="text"
                    value={category.parent}
                  />
                </AvGroup>
              
              <AvGroup>
                <AvField
                  name="thumbnail"
                  className="form-control"
                  label={translate('categories.form.thumbnail.label')}
                  placeholder={translate('categories.form.thumbnail.placeholder')}
                  type="text"
                  value={category.thumbnail}
                />
              </AvGroup>
              <Button tag={Link} to="/admin/categories" replace color="info">
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
  categories : storeState.categories.categories,
  category: storeState.categories.category,
  loading: storeState.categories.loading,
  updating: storeState.categories.updating,
});

const mapDispatchToProps = { getCategories, getCategory, updateCategory, createCategory, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesUpdate);
