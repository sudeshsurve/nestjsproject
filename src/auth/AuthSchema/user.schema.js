"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserSchema = exports.user = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var user_role_enum_1 = require("../../../../../src/comman_enum/user_role.enum");
var user = /** @class */ (function () {
    function user() {
    }
    __decorate([
        (0, mongoose_1.Prop)()
    ], user.prototype, "username");
    __decorate([
        (0, mongoose_1.Prop)()
    ], user.prototype, "email");
    __decorate([
        (0, mongoose_1.Prop)()
    ], user.prototype, "password");
    __decorate([
        (0, mongoose_1.Prop)({
            type: String,
            "enum": user_role_enum_1.User_Role,
            required: true
        })
    ], user.prototype, "role");
    __decorate([
        (0, mongoose_1.Prop)()
    ], user.prototype, "city");
    __decorate([
        (0, mongoose_1.Prop)()
    ], user.prototype, "state");
    __decorate([
        (0, mongoose_1.Prop)()
    ], user.prototype, "gender");
    __decorate([
        (0, mongoose_1.Prop)()
    ], user.prototype, "age");
    user = __decorate([
        (0, mongoose_1.Schema)({ versionKey: false })
    ], user);
    return user;
}());
exports.user = user;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(user);
