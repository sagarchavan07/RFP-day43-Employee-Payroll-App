class EmployeePayrollData{
    set name(name){
		let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z]{2,}$');
		if(nameRegex.test(name))
			this._name=name;
		else {
			throw "Name is Incorrect";
		}
        
    }
    get name(){
        return this._name;
    }
	set profilePic(profilePic){
        this._profilePic=profilePic;
    }
	
	get profilePic(){
        return this._profilePic;
    }

    set gender(gender){
        this._gender=gender;
    }

    get gender(){
        return this._gender;
    }

    set department(department){
        this._department=department;
    }

    get department(){
        return this._department;
    }

    set salary(salary){
        this._salary=salary;
    }

    get salary(){
        return this._salary;
    }

    set startDate(startDate){
        this._startDate=startDate;
    }

    get startDate(){
        return this._startDate;
    }

    set note(note){
        this._note=note;
    }

    get note(){
        return this._note;
    }

    set id(id){
        this._id=id;
    }

    get id(){
        return this._id;
    }

    toString(){
        return(
            "{"
            +" ID = "+this.id
            +" Name = "+this.name
			+", profilePic = "+this.profilePic
            +", Gender = "+this.gender
            +", Department = "+this.department
            +", Salary = "+this.salary
            +", Start Date = "+this.startDate
            +", Notes = "+this.note
            +" }"
        )
    }
}

function save(){
    try{
        let employeePayrollData = createEmployeePayrollData();
    createOrUpdateStorage(employeePayrollData)
    } catch (e) {
        alert(e);
    } 
}

const createEmployeePayrollData = () => {
    let employeePayrollData = new EmployeePayrollData();
    try{
        employeePayrollData.name = document.querySelector('#name').value;
    } catch(e) {
        document.querySelector('.text-error').textContent(e);
        throw e;
    }
    employeePayrollData.profilePic = document.querySelector('input[name="profile"]:checked').value;
    employeePayrollData.gender = document.querySelector('input[name="gender"]:checked').value;
    employeePayrollData.department = getselectedValues('.checkbox');
    employeePayrollData.salary = document.querySelector('#salary').value;
    employeePayrollData.startDate = document.getElementById("start-date").value;
    employeePayrollData.note = document.querySelector('#notes').value;
    employeePayrollData.id = createNewEmpId();
    return employeePayrollData;
}

function createNewEmpId(){
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID)+1).toString();
    localStorage.setItem("EmployeeID", empID);
    return empID;
}

function getselectedValues(propertyValue){
    let allItems = document.querySelectorAll(propertyValue);
    let selectedItems = [];
    allItems.forEach(item => {
        if (item.checked) {
            selectedItems.push(item.value);
        }
    });
    return selectedItems;
}

function createOrUpdateStorage(employeePayrollData){
    let employeePayrollDataList = JSON.parse(localStorage.getItem("employeePayrollDataList"));
    
    if (employeePayrollDataList != undefined) {
        employeePayrollDataList.push(employeePayrollData);
    } else {
        employeePayrollDataList = [employeePayrollData];
    }
    alert(employeePayrollData.toString());
    localStorage.setItem("employeePayrollDataList", JSON.stringify(employeePayrollDataList));
}

const setForm = () => {
    document.querySelector('#name').value = employeePayrollObj._name;
    setSelectedValues('[name=profile]', employeePayrollObj._profilePic); 
    setSelectedValues('[name=gender]', employeePayrollObj._gender); 
    setSelectedValues('[name=department]', employeePayrollObj._department); 
    document.querySelector('#salary').value =employeePayrollObj._salary;
    document.querySelector('#notes').value = employeePayrollObj._note;
    document.querySelector('#start-date').value = employeePayrollObj._startDate; 
}

const setSelectedValues = (propertyValue, value) =>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach( item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        } else if (item.value === value) {
            item.checked = true;
        }
    });
} 

function resetForm (){
    document.querySelector('#name').value = '';
    unsetSelectedValues('[name=profile]'); 
    unsetSelectedValues('Ename=genderl'); 
    unsetSelectedValues('[name=department]'); 
    document.querySelector('#salary').value = '';
    document.querySelector('#notes').value = '';
    document.querySelector('#start-date').value = '2000-01-01'; 
} 
const unsetSelectedValues = (propertyValue) => { 
    let allItems = document.querySelectorAll(propertyValue); 
    allItems.forEach(item => { 
        item.checked = false; 
    }); 
} 

let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener('DOMContentLoaded', (event) => {
	const name = document.querySelector('#name');
	const textError = document.querySelector('.text-error');
	name.addEventListener('input', function(){
		if(name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try{
            let empData=(new EmployeePayrollData());
            empData.name = name.value;
            textError.textContent="";
        } catch (e) {
            textError.textContent = e;
        }
	});

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    salary.addEventListener('input',function(){
        output.textContent = salary.value;
    });
    checkForUpdate();
});

const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}

