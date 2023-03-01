import React from 'react'
import { useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import ButtomCircle from '../../shared/components/ButtomCircle'

const CategoryScreen = () => {
    const [categories, setCategories] =useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [filterText, setFilterText] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    
  return (
   <Card>
    <Card.Header>
        <Row>
            <Col>Categorias</Col>
            <Col className='text-end'>
                <ButtomCircle type={"btn btn-outline-success"} onClick={() =>{}} icon="plus" size={16} />
            </Col>
        </Row>
    </Card.Header>
    <Card.Body>
        <DataTable
            columns={[]}
            data={categories}
            progressPending={isLoading}
            progressComponent={<>LOADING</>}
            noDataComponent={"sin registros"}
            pagination
            paginationComponentOptions={{}}
            subHeaderComponent={<></>}
            persistTableHead
            striped={true}
            highlightOnHover={true}
        />
    </Card.Body>
   </Card>
  )
}

export default CategoryScreen
