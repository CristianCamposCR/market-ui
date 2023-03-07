import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Badge } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import AxiosClient from '../../shared/plugins/axios'
import { ButtonCircle } from '../../shared/components/ButtonCircle'
import { Loading } from '../../shared/components/Loading'
import { FilterComponent } from '../../shared/components/FilterComponent'
import Swal from 'sweetalert2'
import { CategoryForm } from './components/CategoryForm'

const options = {
    rowsPerPageText: 'Registros por página',
    rangeSeparatorText: 'de'
}

export const CategoryScreen = () => {
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [filterText, setFilterText] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const filteredCategories = categories.filter(
        category => category.name && category.name.toLowerCase().includes(filterText.toLowerCase())
    )

    const alertErr=()=>{
        Swal.fire({
            title: "Algo malo paso :(",
            text: "No se han podido obtener las categorias",
            icon:"error",
            confirmButtonText: "Acpetar",
            //backdrop: true
        })
    }
    const getCategories = async () => {
        try {
            setIsLoading(true)
            const data = await AxiosClient({ url: '/category/' })
            if (!data.error) setCategories(data.data)
        } catch (error) {
           alertErr();
        } finally {
            setIsLoading(false)
        }
    }
    //Se ejecuta después del return
    useEffect(() => {
        getCategories()
    }, [])
    /*Recibe una dependencia, si está vacío solo se renderiza una vez, si no, se ejecuta cada que haya un cambio en la dependencia*/

    const headerComponent = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) setFilterText('')
        }
        return (
            <FilterComponent
                onFilter={(e) => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />
        )
    }, [filterText])

    const columns = React.useMemo(() => [{
        name: '#',
        cell: (row, index) => <div>{index + 1}</div>,
        sortable: true,
    },
    {
        name: 'Categoría',
        cell: (row) => <div>{row.name}</div>,
        sortable: true,
        selector: (row) => row.name
    },
    {
        name: 'Estado',
        cell: (row) => row.status ? (<Badge bg='success'>Activo</Badge>) : (<Badge bg='danger'>Inactivo</Badge>),
        sortable: true,
        selector: (row) => row.status
    },
    {
        name: 'Acciones',
        cell: (row) => <>
            <ButtonCircle
                icon='edit'
                type={'btn btn-outline-warning btn-circle'}
                size={16}
                onClick={() => {
                    setIsEditing(true)
                    setSelectedCategory(row)
                }}
            >

            </ButtonCircle>
            {row.status ? (
                <ButtonCircle
                    icon='trash-2'
                    type={'btn btn-outline-danger btn-circle'}
                    size={16}
                    onClick={() => {

                    }}
                ></ButtonCircle>
            ) : (
                <ButtonCircle
                    icon='pocket'
                    type={'btn btn-outline-success btn-circle'}
                    size={16}
                    onClick={() => {

                    }}
                ></ButtonCircle>
            )}
        </>//fragment
    }
    ])
    return <Card>
        <Card.Header>
            <Row>
                <Col>Categorias</Col>
                <Col className='text-end'>
                    <ButtonCircle
                        type={'btn btn-outline-success'}
                        onClick={() =>setIsOpen(true)}
                        icon='plus'
                        size={16}
                    />
                    <CategoryForm
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        setCategories={setCategories}
                    />
                </Col>
            </Row>
        </Card.Header>
        <Card.Body>
            <DataTable
                columns={columns}
                data={filteredCategories}
                progressPending={isLoading}
                progressComponent={<Loading />}
                noDataComponent={'Sin registros'}
                pagination
                paginationComponentOptions={options}
                subHeader
                subHeaderComponent={headerComponent}
                persistTableHead
                striped={true}
                highlightOnHover={true}

            />
        </Card.Body>
    </Card>
}