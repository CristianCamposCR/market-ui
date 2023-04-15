import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button, Col, Row, Form, Modal, FormControl } from "react-bootstrap";
import * as yup from "yup";
import AxiosClient from "../../../shared/plugins/axios";
import FeatherIcon from "feather-icons-react";
import Alert, {
  confirmMsj,
  confirmTitle,
  successMsj,
  successTitle,
  errorMsj,
  errorTitle,
} from "../../../shared/plugins/alerts";

export const ProductForm = ({ isOpen, setProducts, onClose }) => {
    const [subcategories, setSubcategories] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const getSubcategories = async () => {
        try {
            setIsLoading(true)
            const data = await AxiosClient({ url: '/subcategory/' })
            if (!data.error) setSubcategories(data.data)
        } catch (error) {
            //alerta de error al cargar subcategorias
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getSubcategories();
    }, [])
  const form = useFormik({
    initialValues: {
      name: "",
      status: true,
    },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required("Campo obligatorio")
        .min(4, "Mínimo 4 caracteres"),
    }),
    onSubmit: async (values) => {
      return Alert.fire({
        title: confirmTitle,
        text: confirmMsj,
        icon: "warning",
        confirmButtonColor: "#009574",
        confirmButtonText: "Aceptar",
        cancelButtonColor: "#DD6B55",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
        backdrop: true,
        showCancelButton: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Alert.isLoading,
        preConfirm: async () => {
          try {
            const response = await AxiosClient({
              method: "POST",
              url: "/category/",
              data: JSON.stringify(values),
            });
            if (!response.error) {
              setProducts((products) => [response.data, ...products]);
              Alert.fire({
                title: successTitle,
                text: successMsj,
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar",
              }).then((result) => {
                if (result.isConfirmed) {
                  handleClose();
                }
              });
            }
            return response;
          } catch (error) {
            Alert.fire({
              title: errorTitle,
              text: errorMsj,
              icon: "error",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Aceptar",
            }).then((result) => {
              if (result.isConfirmed) {
                handleClose();
              }
            });
          }
        },
      });
    },
  });

  const handleClose = () => {
    form.resetForm();
    onClose();
  };

  return (
    <Modal
      backdrop="static"
      keyboard={false}
      show={isOpen}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Registrar categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={form.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="name"
              placeholder="calzado"
              value={form.values.name}
              onChange={form.handleChange}
            />
            {form.errors.name && (
              <span className="error-text">{form.errors.name}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              name="description"
              placeholder="ingresa una descripción"
              value={form.values.name}
              onChange={form.handleChange}
            />
            {form.errors.name && (
              <span className="error-text">{form.errors.name}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Marca</Form.Label>
            <Form.Control
              name="brand"
              placeholder="Nike"
              value={form.values.name}
              onChange={form.handleChange}
            />
            {form.errors.name && (
              <span className="error-text">{form.errors.name}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>precio</Form.Label>
            <Form.Control
              name="price"
              placeholder="Nike"
              value={form.values.name}
              onChange={form.handleChange}
            />
            {form.errors.name && (
              <span className="error-text">{form.errors.name}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              name="stock"
              placeholder="Nike"
              value={form.values.name}
              onChange={form.handleChange}
            />
            {form.errors.name && (
              <span className="error-text">{form.errors.name}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control as="select"
                name="subcategory_id"
                value={form.values.category_id}
                onChange={form.handleChange}
            >
                <option>Selecciona una categoria</option>
                {subcategories.map(category_id => (
                    <option key={category_id.id} value={category_id.id} onChange={form.handleChange}>{category_id.name}</option>
                ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <FormControl type="file"
            />
          </Form.Group>                     
          <Form.Group className="mb-3">
            <Row>
              <Col className="text-end">
                <Button
                  className="me-2"
                  variant="outline-danger"
                  onClick={handleClose}
                >
                  <FeatherIcon icon="x" /> &nbsp;Cerrar
                </Button>
                <Button type="submit" variant="outline-success">
                  <FeatherIcon icon="check" /> &nbsp;Guardar
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
