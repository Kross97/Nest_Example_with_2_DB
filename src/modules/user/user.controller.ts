import {
    Body,
    Controller,
    Get,
    Param,
    Req,
    RawBodyRequest,
    Post,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
    Delete, Put, UseGuards, Query,
} from '@nestjs/common';
import {UserService} from './user.service';
import {Request, NikitaRequest} from 'express';
import {FileInterceptor, FilesInterceptor} from '@nestjs/platform-express';

import {IUserRequest} from './types';
import {Roles} from '../../common/decorators/roles.decorator';
import {RolesGuard} from '../../common/guards/roles.guard';
import {parsingFormData} from "../../common/utils/parsingFormData";
import {MediaMaterialsEntity} from "../../entities/media_materials/MediaMaterials.entity";
import {MediaBufferEntity} from "../../entities/media_materials/MediaBuffer.entity";


@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    create() {
        return this.userService.createUserMock();
    }


    @Get('refresh')
    refresh() {
        return this.userService.refreshUserData();
    }

    @Get('allRoles')
    getAllRoles() {
        return this.userService.getAllRoles();
    }

    @Post('create')
    createUser(@Body() body: IUserRequest) {
        return this.userService.createUser(body);
    };

    @Post('createFormData')
    /**
     * Полное получение данных о пользователе в формате FormData
     * с использованием кастомного парсинга тела FormData (parsingFormData)
     * и получением тела через читаемый поток Request
     *
     * ----------------------------
     * кастомный парсер FormData также возвращает массив файлов структурой { fileName: string; mimeType: string; buffer: Buffer }
     * */
    async createUserFormData(@Body() body: any, @Req() req: Request) {
        const parsedBody = await parsingFormData<Omit<IUserRequest, 'role' | 'mediaMaterials' | 'car'> & {
            file: { fileName: string; mimeType: string; buffer: Buffer }[]
        }>(req);

        return await this.userService.createUser({
            nameFirst: parsedBody.nameFirst,
            nameLast: parsedBody.nameLast,
            login: parsedBody.login,
            password: parsedBody.password,
            mediaMaterials: parsedBody.file ? parsedBody.file.map((file) => {
              const media = new MediaMaterialsEntity();
              const mediaBuffer = new MediaBufferEntity();

              mediaBuffer.buffer = { data: file.buffer };

              media.buffer = mediaBuffer;
              media.name = file.fileName;
              media.mimeType = file.mimeType;
              media.size = file.buffer.length;
              return media;
            }) : null,
        })
    }


    @Post('createWithFile')
    @UseInterceptors(FileInterceptor('file'))
    // Пример тела:
    // const formData = new FormData();
    // formData.set('user', JSON.stringify({ nameFirst: 'test', nameLast: 'test' }))
    // formData.set('file', new File())

    // Метод получения данных user в json и файла фотографии file , все в FormData
    // при использовании FileInterceptor и UploadedFile в теле остается только данные user в виде строки json
    // оно как будто извлекает файл из тела запроса
    createUserAndFileFormData(@UploadedFile() file: Express.Multer.File, @Body() body: { user: string }, @Req() req: RawBodyRequest<Request>) {
        // console.log('BODY', body);
        const user = JSON.parse(body.user);
        return this.userService.createUserWithMedia(user, file);
    }

    @Get('all')
    // @Roles(['admin'])
    getAllUsers(@Req() request: NikitaRequest, @Query() query: Record<'search', string>) {

        return this.userService.getUsers(query);
    }

    @Get('/:id')
    getCurrentUser(@Param('id') id: string) {
        return this.userService.getOneUser(id);
    }


    @Delete('delete/:id')
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }

    @Put('update/:id')
    updateUser(@Param('id') id: string, @Body() body: IUserRequest) {
        return this.userService.updateUser(id, body);
    }

    @Put('update/photos/:id')
    @UseInterceptors(FilesInterceptor('files'))
    // @Param() - без параметров возвращает обьект значений , @Param('id') - возвращает значение
    updatePhotos(@UploadedFiles() files: Express.Multer.File[], @Param('id') id: string) {
        return this.userService.updatePhotos(id, files)
    }
}
