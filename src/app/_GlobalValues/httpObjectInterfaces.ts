
export class newDocumentInformation {
    Name: string;
    Context: string;
    DocumentUUID: string;
}
export class genericReturn {
    data?: any;
    errorMsg?: string
}


export class CodesValues {
    icon: string;
    description: string;
}

export class AuthorityValues {
    competency: string;
    code: string;
}

export class equipmentMaterialValues {
    qty: number;
    description: string;
    materialNumber: string;
}



//TODO move tasks into these and rename task to WorkTask -> seperation of concerns
export class preTask { }

export class closeoutTask { }

export class taskValues {
    verylow?: number;
    low?: number;
    high?: number;
    veryhigh?: number
}


export class FurtherWork {
    notificationCode?: string;
    description: string;
    identification: string;
    error: boolean;
    submitted: boolean;
    completionCode: string;
}

export class avaliableDocuments {
    Name: string;
    Context: string;
    UUID: string;
}

export class avaliableIncompleteDocuments {
    DocumentUUID: string;//PK
    DocumentName: string;
    DateCreated: string;
    DateLastModified: string;
}

export class avaliableReviewDocuments {
    UUID: string;//PK
    name: string;
    dateCreated: string;
    dateFinished: string;
    who: string;
}

export class avaliableCompletedDocuments {
    idenfication: string;//PK
    name: string;
    dateFinished: string;
    status: string;
}

export class GraphicsData {
    dataName: string;
    xAxis: string;
    yAxis: string;
    data: GraphicsDataPoint[]
}

export class GraphicsDataPoint {
    xValue: string;
    yValue: string;
}

//Work Task HTTPS Interfaces



export class TaskDataReturn {
    iconValid: boolean;
    newIcon?: string;
}

export class CommentToSubmit {
    documentIdentification: string;
    TaskUUID: string;
    comment: string;
}

export class NotificationToSubmit {
    documentIdentification: string;
    notificationIdentification: string;
    notificationValue: string;
    displayIcon: string;
}

export class documentSubmit {
    documentIdentification: string;
    completionTimeStamp: string;
}


//Version 1.0
export class WorkDocument {
    UUID: string;
    Name: string;
    Type: string;
    Title: string;
    Logo: string;
    WorkCenter: string;
    TotalDuration: string;
    SapID: string;
    Revision: string;
    Owner: string;
    OwnerPosition: string;
    Context: string;
    CompletionCodes: CompletionCode[];
    AuthorityToMaintainInformation: AuthorityToMaintainInformation[];
    EquipmentMaterialInformation: EquipmentMaterialInformation[];
    PrestartTasksInformation: TasksInformation[];
    WorkTasksInformation: WorkTasksInformation[];
    FutherWorkTasksInformation: FutherWorkTasksInformation[];
    CloseoutTasksInformation: TasksInformation[];
    ListOfAvaliableCloseoutTasksUUIDs: string[];
    Technician: string;
    TechnicianPosition: string;
    TechnicianSignature: string;
    Reviewer: string;
    ReviewerPosition: string;
    ReviewerSignature: string;
    AccessDate: string;
    Submitted: boolean;
    DocumentReviewed: boolean;
    SubmitDate: string;
    ReviewDate: string;
    DisplayImages: boolean;
    GeneralComments: string[];
    ExcuseComments: string[];
}

export class AuthorityToMaintainInformation {
    AuthorityCode: string;
    CompetencyInformation: string;
}

export class TasksInformation {
    UUID: string;
    Name: string;
    Duration: string;
    Image: null | string;
    Information: string;
    CompletionCode: string;
    Submitted: boolean;
    Error: boolean;
    Comments: string[];
}

export class CompletionCode {
    CompletionKey: string;
    IconHyperLink: string;
    Description: string;
    Name: string;
}

export class EquipmentMaterialInformation {
    MaterialNumber: string;
    Quantity: string;
    Information: string;
}

export class FutherWorkTasksInformation {
    UUID: string;
    Name: string;
    Information: string;
    CompletionCode: string;
    Submitted: boolean;
    SubmittedValue: null | string;
    Error: boolean;
    Comments: string[];
}

export class WorkTasksInformation {
    UUID: string;
    Name: string;
    Duration: string;
    Image: null | string;
    Information: string;
    InputID: string;
    Values: Values;
    Units: string;
    UnitsTitle: string;
    Submitted: boolean;
    Error: boolean;
    TypeOfInput: string;
    InputValues: null | string;
    TaskLinks: TaskLink[] | null;
    CompletionCode: string;
    SubmittedValue: null | string;
    Comments: string[];
}

export class TaskLink {
    UUID: string;
    TriggerCondition: string;
    ShowTask: boolean;
}

export class Values {
    VeryLow: null | string;
    Low: null | string;
    High: null | string;
    VeryHigh: null | string;
}

export class TaskInformationToSend {
    DocumentUUID: string;
    TaskUUID: string;
    SubmittedValues: TaskInformationToSendSubmittedValues;

}

export class TaskInformationToSendSubmittedValues {
    CompletionKey: string;
    Submitted: boolean;
    SubmittedValue?: string;
}

export class CommentInformationToSend {
    DocumentUUID: string;
    Comment: string;
    TaskUUID: string;
}

export class GraphTasksAvaliable {
    Documents: GraphDocumentInformation[];
    constructor() {
        this.Documents = new Array<GraphDocumentInformation>();
    }
}

export class GraphDocumentInformation {
    Name: string;
    DocumentUUID: string;
    Tasks: GraphDocumentTask[];
    constructor() { this.Tasks = new Array<GraphDocumentTask>(); }
}

export class GraphDocumentTask {
    UUID: string;
    Name: string;
}

export class ServerData {
    TypeofRequest: string;
    Data: TaskData[];
    constructor() { this.Data = new Array<TaskData>(); }
}

export class TaskData {
    TaskUUID: string;
    SubmittedValue: string;
    DocumentUUID: string;
    Date: string;
}

//GraphData Organised by frontend. As receive a info dump from server on data that needs to be organised
export class OrganisedGraphData {
    DocumentUUID: string;
    Tasks: OrganisedDocumentTasks[];
    constructor() {
        this.Tasks = new Array<OrganisedDocumentTasks>();
    }
}

export class OrganisedDocumentTasks {
    TaskUUID: string;
    TaskName: string;
    Data: OrganisedTaskData[];
    constructor() {
        this.Data = new Array<OrganisedTaskData>();
    }
}

export class OrganisedTaskData {
    Value: string;
    Date: Date;
}

export class DocumentInformationForGraph {
    Document: Document;
}

export class Document {
    Name: string;
    ID: string;
    Tasks: Task[];
    constructor() {
        this.Tasks = new Array<Task>();
    }
}

export class Task {
    UUID: string;
    Name: string;
}

export class GraphMetaData {
    StartDateDisplayed: Date;
    EndDateDisplayed: Date;
    DocumentUUIDS: Array<string>;
    TaskUUIDS: Array<string>;

    constructor() {
        this.TaskUUIDS = new Array<string>();
        this.DocumentUUIDS = new Array<string>();
    }
}

//Data Requests to Server Interfaces
export class RequestGraphData {
    DocumentAndTasks: DocumentAndTask[];
    StartDate: string;
    EndDate: string;
    DataType: string;
    constructor() {
        this.DocumentAndTasks = new Array<DocumentAndTask>();
    }
}

export class DocumentAndTask {
    DocumentUUID: string;
    TaskUUIDs: string;
}

export class CommentPopUpData {
    Title: string;
    ExcuseComments?: Array<string>;
    ShowExcuses: boolean;
}
// Generated by https://quicktype.io
