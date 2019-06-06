var __extends = this && this.__extends || function() {
    var extendStatics = function(d, b) {
        return (extendStatics = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(d, b) {
            d.__proto__ = b;
        } || function(d, b) {
            for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        })(d, b);
    };
    return function(d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();

!function() {
    "use strict";
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    var ANNOTATIONS = "__annotations__", PARAMETERS = "__parameters__", PROP_METADATA = "__prop__metadata__";
    function makeDecorator(name, props, parentClass, additionalProcessing, typeFn) {
        var metaCtor = makeMetadataCtor(props);
        function DecoratorFactory() {
            for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
            if (this instanceof DecoratorFactory) {
                metaCtor.call.apply(metaCtor, [ this ].concat(args));
                return this;
            }
            var annotationInstance = new (DecoratorFactory.bind.apply(DecoratorFactory, [ void 0 ].concat(args)))();
            return function(cls) {
                typeFn && typeFn.apply(void 0, [ cls ].concat(args));
                (cls.hasOwnProperty(ANNOTATIONS) ? cls[ANNOTATIONS] : Object.defineProperty(cls, ANNOTATIONS, {
                    value: []
                })[ANNOTATIONS]).push(annotationInstance);
                additionalProcessing && additionalProcessing(cls);
                return cls;
            };
        }
        parentClass && (DecoratorFactory.prototype = Object.create(parentClass.prototype));
        DecoratorFactory.prototype.ngMetadataName = name;
        DecoratorFactory.annotationCls = DecoratorFactory;
        return DecoratorFactory;
    }
    function makeMetadataCtor(props) {
        return function() {
            for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
            if (props) {
                var values = props.apply(void 0, args);
                for (var propName in values) this[propName] = values[propName];
            }
        };
    }
    function makeParamDecorator(name, props, parentClass) {
        var metaCtor = makeMetadataCtor(props);
        function ParamDecoratorFactory() {
            for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
            if (this instanceof ParamDecoratorFactory) {
                metaCtor.apply(this, args);
                return this;
            }
            var annotationInstance = new (ParamDecoratorFactory.bind.apply(ParamDecoratorFactory, [ void 0 ].concat(args)))();
            ParamDecorator.annotation = annotationInstance;
            return ParamDecorator;
            function ParamDecorator(cls, unusedKey, index) {
                for (var parameters = cls.hasOwnProperty(PARAMETERS) ? cls[PARAMETERS] : Object.defineProperty(cls, PARAMETERS, {
                    value: []
                })[PARAMETERS]; parameters.length <= index; ) parameters.push(null);
                (parameters[index] = parameters[index] || []).push(annotationInstance);
                return cls;
            }
        }
        parentClass && (ParamDecoratorFactory.prototype = Object.create(parentClass.prototype));
        ParamDecoratorFactory.prototype.ngMetadataName = name;
        ParamDecoratorFactory.annotationCls = ParamDecoratorFactory;
        return ParamDecoratorFactory;
    }
    function makePropDecorator(name, props, parentClass, additionalProcessing) {
        var metaCtor = makeMetadataCtor(props);
        function PropDecoratorFactory() {
            for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
            if (this instanceof PropDecoratorFactory) {
                metaCtor.apply(this, args);
                return this;
            }
            var decoratorInstance = new (PropDecoratorFactory.bind.apply(PropDecoratorFactory, [ void 0 ].concat(args)))();
            function PropDecorator(target, name) {
                var constructor = target.constructor, meta = constructor.hasOwnProperty(PROP_METADATA) ? constructor[PROP_METADATA] : Object.defineProperty(constructor, PROP_METADATA, {
                    value: {}
                })[PROP_METADATA];
                meta[name] = meta.hasOwnProperty(name) && meta[name] || [];
                meta[name].unshift(decoratorInstance);
                additionalProcessing && additionalProcessing.apply(void 0, [ target, name ].concat(args));
            }
            return PropDecorator;
        }
        parentClass && (PropDecoratorFactory.prototype = Object.create(parentClass.prototype));
        PropDecoratorFactory.prototype.ngMetadataName = name;
        PropDecoratorFactory.annotationCls = PropDecoratorFactory;
        return PropDecoratorFactory;
    }
    var InjectFlags, Inject = makeParamDecorator("Inject", function(token) {
        return {
            token: token
        };
    }), Optional = makeParamDecorator("Optional"), Self = makeParamDecorator("Self"), SkipSelf = makeParamDecorator("SkipSelf"), Host = makeParamDecorator("Host"), Attribute = makeParamDecorator("Attribute", function(attributeName) {
        return {
            attributeName: attributeName
        };
    });
    !function(InjectFlags) {
        InjectFlags[InjectFlags.Default = 0] = "Default";
        InjectFlags[InjectFlags.Host = 1] = "Host";
        InjectFlags[InjectFlags.Self = 2] = "Self";
        InjectFlags[InjectFlags.SkipSelf = 4] = "SkipSelf";
        InjectFlags[InjectFlags.Optional = 8] = "Optional";
    }(InjectFlags || (InjectFlags = {}));
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    function getClosureSafeProperty(objWithPropertyToExtract) {
        for (var key in objWithPropertyToExtract) if (objWithPropertyToExtract[key] === getClosureSafeProperty) return key;
        throw Error("Could not find renamed property on target object.");
    }
    function fillProperties(target, source) {
        for (var key in source) source.hasOwnProperty(key) && !target.hasOwnProperty(key) && (target[key] = source[key]);
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    function ɵɵdefineInjectable(opts) {
        return {
            providedIn: opts.providedIn || null,
            factory: opts.factory,
            value: void 0
        };
    }
    function ɵɵdefineInjector(options) {
        return {
            factory: options.factory,
            providers: options.providers || [],
            imports: options.imports || []
        };
    }
    function getInjectableDef(type) {
        return type && type.hasOwnProperty(NG_INJECTABLE_DEF) ? type[NG_INJECTABLE_DEF] : null;
    }
    function getInheritedInjectableDef(type) {
        if (type && type[NG_INJECTABLE_DEF]) {
            console.warn('DEPRECATED: DI is instantiating a token "' + type.name + '" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in v10. Please add @Injectable() to the "' + type.name + '" class.');
            return type[NG_INJECTABLE_DEF];
        }
        return null;
    }
    function getInjectorDef(type) {
        return type && type.hasOwnProperty(NG_INJECTOR_DEF) ? type[NG_INJECTOR_DEF] : null;
    }
    var NG_INJECTABLE_DEF = getClosureSafeProperty({
        ngInjectableDef: getClosureSafeProperty
    }), NG_INJECTOR_DEF = getClosureSafeProperty({
        ngInjectorDef: getClosureSafeProperty
    });
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function stringify(token) {
        if ("string" == typeof token) return token;
        if (token instanceof Array) return "[" + token.map(stringify).join(", ") + "]";
        if (null == token) return "" + token;
        if (token.overriddenName) return "" + token.overriddenName;
        if (token.name) return "" + token.name;
        var res = token.toString();
        if (null == res) return "" + res;
        var newLineIndex = res.indexOf("\n");
        return -1 === newLineIndex ? res : res.substring(0, newLineIndex);
    }
    var __forward_ref__ = getClosureSafeProperty({
        __forward_ref__: getClosureSafeProperty
    });
    function forwardRef(forwardRefFn) {
        forwardRefFn.__forward_ref__ = forwardRef;
        forwardRefFn.toString = function() {
            return stringify(this());
        };
        return forwardRefFn;
    }
    function resolveForwardRef(type) {
        var fn = type;
        return "function" == typeof fn && fn.hasOwnProperty(__forward_ref__) && fn.__forward_ref__ === forwardRef ? fn() : type;
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    var R3ResolvedDependencyType, __globalThis = "undefined" != typeof globalThis && globalThis, __window = "undefined" != typeof window && window, __self = "undefined" != typeof self && "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && self, __global = "undefined" != typeof global && global, _global = __globalThis || __global || __window || __self;
    !function(R3ResolvedDependencyType) {
        R3ResolvedDependencyType[R3ResolvedDependencyType.Token = 0] = "Token";
        R3ResolvedDependencyType[R3ResolvedDependencyType.Attribute = 1] = "Attribute";
    }(R3ResolvedDependencyType || (R3ResolvedDependencyType = {}));
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    function getCompilerFacade() {
        var globalNg = _global.ng;
        if (!globalNg || !globalNg.ɵcompilerFacade) throw new Error("Angular JIT compilation failed: '@angular/compiler' not loaded!\n  - JIT compilation is discouraged for production use-cases! Consider AOT mode instead.\n  - Did you bootstrap using '@angular/platform-browser-dynamic' or '@angular/platform-server'?\n  - Alternatively provide the compiler with 'import \"@angular/compiler\";' before bootstrapping.");
        return globalNg.ɵcompilerFacade;
    }
    var _injectImplementation, InjectionToken = function() {
        function InjectionToken(_desc, options) {
            this._desc = _desc;
            this.ngMetadataName = "InjectionToken";
            this.ngInjectableDef = void 0;
            "number" == typeof options ? this.__NG_ELEMENT_ID__ = options : void 0 !== options && (this.ngInjectableDef = ɵɵdefineInjectable({
                providedIn: options.providedIn || "root",
                factory: options.factory
            }));
        }
        InjectionToken.prototype.toString = function() {
            return "InjectionToken " + this._desc;
        };
        return InjectionToken;
    }(), INJECTOR = new InjectionToken("INJECTOR", -1), THROW_IF_NOT_FOUND = new Object(), NG_TEMP_TOKEN_PATH = "ngTempTokenPath", NG_TOKEN_PATH = "ngTokenPath", NEW_LINE = /\n/gm, NO_NEW_LINE = "ɵ", SOURCE = "__source", USE_VALUE = getClosureSafeProperty({
        provide: String,
        useValue: getClosureSafeProperty
    }), _currentInjector = void 0;
    function setCurrentInjector(injector) {
        var former = _currentInjector;
        _currentInjector = injector;
        return former;
    }
    function setInjectImplementation(impl) {
        var previous = _injectImplementation;
        _injectImplementation = impl;
        return previous;
    }
    function injectInjectorOnly(token, flags) {
        void 0 === flags && (flags = InjectFlags.Default);
        if (void 0 === _currentInjector) throw new Error("inject() must be called from an injection context");
        return null === _currentInjector ? injectRootLimpMode(token, void 0, flags) : _currentInjector.get(token, flags & InjectFlags.Optional ? null : void 0, flags);
    }
    function ɵɵinject(token, flags) {
        void 0 === flags && (flags = InjectFlags.Default);
        return (_injectImplementation || injectInjectorOnly)(token, flags);
    }
    var inject = ɵɵinject;
    function injectRootLimpMode(token, notFoundValue, flags) {
        var injectableDef = getInjectableDef(token);
        if (injectableDef && "root" == injectableDef.providedIn) return void 0 === injectableDef.value ? injectableDef.value = injectableDef.factory() : injectableDef.value;
        if (flags & InjectFlags.Optional) return null;
        if (void 0 !== notFoundValue) return notFoundValue;
        throw new Error("Injector: NOT_FOUND [" + stringify(token) + "]");
    }
    function injectArgs(types) {
        for (var args = [], i = 0; i < types.length; i++) {
            var arg = resolveForwardRef(types[i]);
            if (Array.isArray(arg)) {
                if (0 === arg.length) throw new Error("Arguments array must have arguments.");
                for (var type = void 0, flags = InjectFlags.Default, j = 0; j < arg.length; j++) {
                    var meta = arg[j];
                    meta instanceof Optional || "Optional" === meta.ngMetadataName || meta === Optional ? flags |= InjectFlags.Optional : meta instanceof SkipSelf || "SkipSelf" === meta.ngMetadataName || meta === SkipSelf ? flags |= InjectFlags.SkipSelf : meta instanceof Self || "Self" === meta.ngMetadataName || meta === Self ? flags |= InjectFlags.Self : type = meta instanceof Inject || meta === Inject ? meta.token : meta;
                }
                args.push(ɵɵinject(type, flags));
            } else args.push(ɵɵinject(arg));
        }
        return args;
    }
    var NullInjector = function() {
        function NullInjector() {}
        NullInjector.prototype.get = function(token, notFoundValue) {
            void 0 === notFoundValue && (notFoundValue = THROW_IF_NOT_FOUND);
            if (notFoundValue === THROW_IF_NOT_FOUND) {
                var error = new Error("NullInjectorError: No provider for " + stringify(token) + "!");
                error.name = "NullInjectorError";
                throw error;
            }
            return notFoundValue;
        };
        return NullInjector;
    }();
    function catchInjectorError(e, token, injectorErrorName, source) {
        var tokenPath = e[NG_TEMP_TOKEN_PATH];
        token[SOURCE] && tokenPath.unshift(token[SOURCE]);
        e.message = formatError("\n" + e.message, tokenPath, injectorErrorName, source);
        e[NG_TOKEN_PATH] = tokenPath;
        e[NG_TEMP_TOKEN_PATH] = null;
        throw e;
    }
    function formatError(text, obj, injectorErrorName, source) {
        void 0 === source && (source = null);
        text = text && "\n" === text.charAt(0) && text.charAt(1) == NO_NEW_LINE ? text.substr(2) : text;
        var context = stringify(obj);
        if (obj instanceof Array) context = obj.map(stringify).join(" -> "); else if ("object" == typeof obj) {
            var parts = [];
            for (var key in obj) if (obj.hasOwnProperty(key)) {
                var value = obj[key];
                parts.push(key + ":" + ("string" == typeof value ? JSON.stringify(value) : stringify(value)));
            }
            context = "{" + parts.join(", ") + "}";
        }
        return injectorErrorName + (source ? "(" + source + ")" : "") + "[" + context + "]: " + text.replace(NEW_LINE, "\n  ");
    }
    var angularCoreDiEnv = {
        "ɵɵdefineInjectable": ɵɵdefineInjectable,
        "ɵɵdefineInjector": ɵɵdefineInjector,
        "ɵɵinject": ɵɵinject,
        "ɵɵgetFactoryOf": getFactoryOf
    };
    function getFactoryOf(type) {
        var typeAny = type, def = getInjectableDef(typeAny) || getInjectorDef(typeAny);
        return def && void 0 !== def.factory ? def.factory : null;
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    var Type = Function;
    function isType(v) {
        return "function" == typeof v;
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    var DELEGATE_CTOR = /^function\s+\S+\(\)\s*{[\s\S]+\.apply\(this,\s*arguments\)/, INHERITED_CLASS = /^class\s+[A-Za-z\d$_]*\s*extends\s+[^{]+{/, INHERITED_CLASS_WITH_CTOR = /^class\s+[A-Za-z\d$_]*\s*extends\s+[^{]+{[\s\S]*constructor\s*\(/, INHERITED_CLASS_WITH_DELEGATE_CTOR = /^class\s+[A-Za-z\d$_]*\s*extends\s+[^{]+{[\s\S]*constructor\s*\(\)\s*{\s+super\(\.\.\.arguments\)/;
    function isDelegateCtor(typeStr) {
        return DELEGATE_CTOR.test(typeStr) || INHERITED_CLASS_WITH_DELEGATE_CTOR.test(typeStr) || INHERITED_CLASS.test(typeStr) && !INHERITED_CLASS_WITH_CTOR.test(typeStr);
    }
    var ReflectionCapabilities = function() {
        function ReflectionCapabilities(reflect) {
            this._reflect = reflect || _global.Reflect;
        }
        ReflectionCapabilities.prototype.isReflectionEnabled = function() {
            return !0;
        };
        ReflectionCapabilities.prototype.factory = function(t) {
            return function() {
                for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
                return new (t.bind.apply(t, [ void 0 ].concat(args)))();
            };
        };
        ReflectionCapabilities.prototype._zipTypesAndAnnotations = function(paramTypes, paramAnnotations) {
            var result;
            result = void 0 === paramTypes ? new Array(paramAnnotations.length) : new Array(paramTypes.length);
            for (var i = 0; i < result.length; i++) {
                result[i] = void 0 === paramTypes ? [] : paramTypes[i] != Object ? [ paramTypes[i] ] : [];
                paramAnnotations && null != paramAnnotations[i] && (result[i] = result[i].concat(paramAnnotations[i]));
            }
            return result;
        };
        ReflectionCapabilities.prototype._ownParameters = function(type, parentCtor) {
            if (isDelegateCtor(type.toString())) return null;
            if (type.parameters && type.parameters !== parentCtor.parameters) return type.parameters;
            var tsickleCtorParams = type.ctorParameters;
            if (tsickleCtorParams && tsickleCtorParams !== parentCtor.ctorParameters) {
                var ctorParameters = "function" == typeof tsickleCtorParams ? tsickleCtorParams() : tsickleCtorParams, paramTypes_1 = ctorParameters.map(function(ctorParam) {
                    return ctorParam && ctorParam.type;
                }), paramAnnotations_1 = ctorParameters.map(function(ctorParam) {
                    return ctorParam && convertTsickleDecoratorIntoMetadata(ctorParam.decorators);
                });
                return this._zipTypesAndAnnotations(paramTypes_1, paramAnnotations_1);
            }
            var paramAnnotations = type.hasOwnProperty(PARAMETERS) && type[PARAMETERS], paramTypes = this._reflect && this._reflect.getOwnMetadata && this._reflect.getOwnMetadata("design:paramtypes", type);
            return paramTypes || paramAnnotations ? this._zipTypesAndAnnotations(paramTypes, paramAnnotations) : new Array(type.length).fill(void 0);
        };
        ReflectionCapabilities.prototype.parameters = function(type) {
            if (!isType(type)) return [];
            var parentCtor = getParentCtor(type), parameters = this._ownParameters(type, parentCtor);
            parameters || parentCtor === Object || (parameters = this.parameters(parentCtor));
            return parameters || [];
        };
        ReflectionCapabilities.prototype._ownAnnotations = function(typeOrFunc, parentCtor) {
            if (typeOrFunc.annotations && typeOrFunc.annotations !== parentCtor.annotations) {
                var annotations = typeOrFunc.annotations;
                "function" == typeof annotations && annotations.annotations && (annotations = annotations.annotations);
                return annotations;
            }
            return typeOrFunc.decorators && typeOrFunc.decorators !== parentCtor.decorators ? convertTsickleDecoratorIntoMetadata(typeOrFunc.decorators) : typeOrFunc.hasOwnProperty(ANNOTATIONS) ? typeOrFunc[ANNOTATIONS] : null;
        };
        ReflectionCapabilities.prototype.annotations = function(typeOrFunc) {
            if (!isType(typeOrFunc)) return [];
            var parentCtor = getParentCtor(typeOrFunc), ownAnnotations = this._ownAnnotations(typeOrFunc, parentCtor) || [];
            return (parentCtor !== Object ? this.annotations(parentCtor) : []).concat(ownAnnotations);
        };
        ReflectionCapabilities.prototype._ownPropMetadata = function(typeOrFunc, parentCtor) {
            if (typeOrFunc.propMetadata && typeOrFunc.propMetadata !== parentCtor.propMetadata) {
                var propMetadata = typeOrFunc.propMetadata;
                "function" == typeof propMetadata && propMetadata.propMetadata && (propMetadata = propMetadata.propMetadata);
                return propMetadata;
            }
            if (typeOrFunc.propDecorators && typeOrFunc.propDecorators !== parentCtor.propDecorators) {
                var propDecorators_1 = typeOrFunc.propDecorators, propMetadata_1 = {};
                Object.keys(propDecorators_1).forEach(function(prop) {
                    propMetadata_1[prop] = convertTsickleDecoratorIntoMetadata(propDecorators_1[prop]);
                });
                return propMetadata_1;
            }
            return typeOrFunc.hasOwnProperty(PROP_METADATA) ? typeOrFunc[PROP_METADATA] : null;
        };
        ReflectionCapabilities.prototype.propMetadata = function(typeOrFunc) {
            if (!isType(typeOrFunc)) return {};
            var parentCtor = getParentCtor(typeOrFunc), propMetadata = {};
            if (parentCtor !== Object) {
                var parentPropMetadata_1 = this.propMetadata(parentCtor);
                Object.keys(parentPropMetadata_1).forEach(function(propName) {
                    propMetadata[propName] = parentPropMetadata_1[propName];
                });
            }
            var ownPropMetadata = this._ownPropMetadata(typeOrFunc, parentCtor);
            ownPropMetadata && Object.keys(ownPropMetadata).forEach(function(propName) {
                var decorators = [];
                propMetadata.hasOwnProperty(propName) && decorators.push.apply(decorators, propMetadata[propName]);
                decorators.push.apply(decorators, ownPropMetadata[propName]);
                propMetadata[propName] = decorators;
            });
            return propMetadata;
        };
        ReflectionCapabilities.prototype.ownPropMetadata = function(typeOrFunc) {
            return isType(typeOrFunc) && this._ownPropMetadata(typeOrFunc, getParentCtor(typeOrFunc)) || {};
        };
        ReflectionCapabilities.prototype.hasLifecycleHook = function(type, lcProperty) {
            return type instanceof Type && lcProperty in type.prototype;
        };
        ReflectionCapabilities.prototype.guards = function(type) {
            return {};
        };
        ReflectionCapabilities.prototype.getter = function(name) {
            return new Function("o", "return o." + name + ";");
        };
        ReflectionCapabilities.prototype.setter = function(name) {
            return new Function("o", "v", "return o." + name + " = v;");
        };
        ReflectionCapabilities.prototype.method = function(name) {
            return new Function("o", "args", "if (!o." + name + ") throw new Error('\"" + name + "\" is undefined');\n        return o." + name + ".apply(o, args);");
        };
        ReflectionCapabilities.prototype.importUri = function(type) {
            return "object" == typeof type && type.filePath ? type.filePath : "./" + stringify(type);
        };
        ReflectionCapabilities.prototype.resourceUri = function(type) {
            return "./" + stringify(type);
        };
        ReflectionCapabilities.prototype.resolveIdentifier = function(name, moduleUrl, members, runtime) {
            return runtime;
        };
        ReflectionCapabilities.prototype.resolveEnum = function(enumIdentifier, name) {
            return enumIdentifier[name];
        };
        return ReflectionCapabilities;
    }();
    function convertTsickleDecoratorIntoMetadata(decoratorInvocations) {
        return decoratorInvocations ? decoratorInvocations.map(function(decoratorInvocation) {
            var annotationCls = decoratorInvocation.type.annotationCls;
            return new (annotationCls.bind.apply(annotationCls, [ void 0 ].concat(decoratorInvocation.args ? decoratorInvocation.args : [])))();
        }) : [];
    }
    function getParentCtor(ctor) {
        var parentProto = ctor.prototype ? Object.getPrototypeOf(ctor.prototype) : null;
        return (parentProto ? parentProto.constructor : null) || Object;
    }
    var _reflect = null;
    function getReflect() {
        return _reflect = _reflect || new ReflectionCapabilities();
    }
    function reflectDependencies(type) {
        return convertDependencies(getReflect().parameters(type));
    }
    function convertDependencies(deps) {
        var compiler = getCompilerFacade();
        return deps.map(function(dep) {
            return reflectDependency(compiler, dep);
        });
    }
    function reflectDependency(compiler, dep) {
        var meta = {
            token: null,
            host: !1,
            optional: !1,
            resolved: compiler.R3ResolvedDependencyType.Token,
            self: !1,
            skipSelf: !1
        };
        function setTokenAndResolvedType(token) {
            meta.resolved = compiler.R3ResolvedDependencyType.Token;
            meta.token = token;
        }
        if (Array.isArray(dep)) {
            if (0 === dep.length) throw new Error("Dependency array must have arguments.");
            for (var j = 0; j < dep.length; j++) {
                var param = dep[j];
                if (void 0 !== param) if (param instanceof Optional || "Optional" === param.__proto__.ngMetadataName) meta.optional = !0; else if (param instanceof SkipSelf || "SkipSelf" === param.__proto__.ngMetadataName) meta.skipSelf = !0; else if (param instanceof Self || "Self" === param.__proto__.ngMetadataName) meta.self = !0; else if (param instanceof Host || "Host" === param.__proto__.ngMetadataName) meta.host = !0; else if (param instanceof Inject) meta.token = param.token; else if (param instanceof Attribute) {
                    if (void 0 === param.attributeName) throw new Error("Attribute name must be defined.");
                    meta.token = param.attributeName;
                    meta.resolved = compiler.R3ResolvedDependencyType.Attribute;
                } else setTokenAndResolvedType(param);
            }
        } else setTokenAndResolvedType(dep);
        return meta;
    }
    function compileInjectable(type, srcMeta) {
        var def = null;
        type.hasOwnProperty(NG_INJECTABLE_DEF) || Object.defineProperty(type, NG_INJECTABLE_DEF, {
            get: function() {
                if (null === def) {
                    var meta = srcMeta || {
                        providedIn: null
                    }, hasAProvider = isUseClassProvider(meta) || isUseFactoryProvider(meta) || isUseValueProvider(meta) || isUseExistingProvider(meta), compilerMeta = {
                        name: type.name,
                        type: type,
                        typeArgumentCount: 0,
                        providedIn: meta.providedIn,
                        ctorDeps: reflectDependencies(type),
                        userDeps: void 0
                    };
                    (isUseClassProvider(meta) || isUseFactoryProvider(meta)) && void 0 !== meta.deps && (compilerMeta.userDeps = convertDependencies(meta.deps));
                    if (hasAProvider) if (isUseClassProvider(meta)) compilerMeta.useClass = meta.useClass; else if (isUseValueProvider(meta)) compilerMeta.useValue = meta.useValue; else if (isUseFactoryProvider(meta)) compilerMeta.useFactory = meta.useFactory; else {
                        if (!isUseExistingProvider(meta)) throw new Error("Unreachable state.");
                        compilerMeta.useExisting = meta.useExisting;
                    } else compilerMeta.useClass = type;
                    def = getCompilerFacade().compileInjectable(angularCoreDiEnv, "ng:///" + type.name + "/ngInjectableDef.js", compilerMeta);
                }
                return def;
            }
        });
    }
    var USE_VALUE$1 = getClosureSafeProperty({
        provide: String,
        useValue: getClosureSafeProperty
    });
    function isUseClassProvider(meta) {
        return void 0 !== meta.useClass;
    }
    function isUseValueProvider(meta) {
        return USE_VALUE$1 in meta;
    }
    function isUseFactoryProvider(meta) {
        return void 0 !== meta.useFactory;
    }
    function isUseExistingProvider(meta) {
        return void 0 !== meta.useExisting;
    }
    getClosureSafeProperty({
        provide: String,
        useValue: getClosureSafeProperty
    });
    var Injectable = makeDecorator("Injectable", void 0, void 0, void 0, function(type, meta) {
        return SWITCH_COMPILE_INJECTABLE(type, meta);
    }), SWITCH_COMPILE_INJECTABLE = compileInjectable;
    function throwCyclicDependencyError(token) {
        throw new Error("Cannot instantiate cyclic dependency! " + token);
    }
    function throwMultipleComponentError(tNode) {
        throw new Error("Multiple components match node with tagname " + tNode.tagName);
    }
    function throwMixedMultiProviderError() {
        throw new Error("Cannot mix multi providers and regular providers");
    }
    function throwInvalidProviderError(ngModuleType, providers, provider) {
        var ngModuleDetail = "";
        ngModuleType && providers && (ngModuleDetail = " - only instances of Provider and Type are allowed, got: [" + providers.map(function(v) {
            return v == provider ? "?" + provider + "?" : "...";
        }).join(", ") + "]");
        throw new Error("Invalid provider for the NgModule '" + stringify(ngModuleType) + "'" + ngModuleDetail);
    }
    var APP_ROOT = new InjectionToken("The presence of this token marks an injector as being the root injector."), NOT_YET = {}, CIRCULAR = {}, EMPTY_ARRAY = [], NULL_INJECTOR = void 0;
    function getNullInjector() {
        void 0 === NULL_INJECTOR && (NULL_INJECTOR = new NullInjector());
        return NULL_INJECTOR;
    }
    function createInjector(defType, parent, additionalProviders, name) {
        void 0 === parent && (parent = null);
        void 0 === additionalProviders && (additionalProviders = null);
        parent = parent || getNullInjector();
        return new R3Injector(defType, additionalProviders, parent, name);
    }
    var R3Injector = function() {
        function R3Injector(def, additionalProviders, parent, source) {
            void 0 === source && (source = null);
            var _this = this;
            this.parent = parent;
            this.records = new Map();
            this.injectorDefTypes = new Set();
            this.onDestroy = new Set();
            this._destroyed = !1;
            var dedupStack = [];
            deepForEach([ def ], function(injectorDef) {
                return _this.processInjectorType(injectorDef, [], dedupStack);
            });
            additionalProviders && deepForEach(additionalProviders, function(provider) {
                return _this.processProvider(provider, def, additionalProviders);
            });
            this.records.set(INJECTOR, makeRecord(void 0, this));
            this.isRootInjector = this.records.has(APP_ROOT);
            this.injectorDefTypes.forEach(function(defType) {
                return _this.get(defType);
            });
            this.source = source || ("object" == typeof def ? null : stringify(def));
        }
        Object.defineProperty(R3Injector.prototype, "destroyed", {
            get: function() {
                return this._destroyed;
            },
            enumerable: !0,
            configurable: !0
        });
        R3Injector.prototype.destroy = function() {
            this.assertNotDestroyed();
            this._destroyed = !0;
            try {
                this.onDestroy.forEach(function(service) {
                    return service.ngOnDestroy();
                });
            } finally {
                this.records.clear();
                this.onDestroy.clear();
                this.injectorDefTypes.clear();
            }
        };
        R3Injector.prototype.get = function(token, notFoundValue, flags) {
            void 0 === notFoundValue && (notFoundValue = THROW_IF_NOT_FOUND);
            void 0 === flags && (flags = InjectFlags.Default);
            this.assertNotDestroyed();
            var previousInjector = setCurrentInjector(this);
            try {
                if (!(flags & InjectFlags.SkipSelf)) {
                    var record = this.records.get(token);
                    if (void 0 === record) {
                        var def = couldBeInjectableType(token) && getInjectableDef(token);
                        if (def && this.injectableDefInScope(def)) {
                            record = makeRecord(injectableDefOrInjectorDefFactory(token), NOT_YET);
                            this.records.set(token, record);
                        }
                    }
                    if (void 0 !== record) return this.hydrate(token, record);
                }
                return (flags & InjectFlags.Self ? getNullInjector() : this.parent).get(token, flags & InjectFlags.Optional ? null : notFoundValue);
            } catch (e) {
                if ("NullInjectorError" === e.name) {
                    (e[NG_TEMP_TOKEN_PATH] = e[NG_TEMP_TOKEN_PATH] || []).unshift(stringify(token));
                    if (previousInjector) throw e;
                    return catchInjectorError(e, token, "R3InjectorError", this.source);
                }
                throw e;
            } finally {
                setCurrentInjector(previousInjector);
            }
        };
        R3Injector.prototype.toString = function() {
            var tokens = [];
            this.records.forEach(function(v, token) {
                return tokens.push(stringify(token));
            });
            return "R3Injector[" + tokens.join(", ") + "]";
        };
        R3Injector.prototype.assertNotDestroyed = function() {
            if (this._destroyed) throw new Error("Injector has already been destroyed.");
        };
        R3Injector.prototype.processInjectorType = function(defOrWrappedDef, parents, dedupStack) {
            var _this = this;
            if (!(defOrWrappedDef = resolveForwardRef(defOrWrappedDef))) return !1;
            var def = getInjectorDef(defOrWrappedDef), ngModule = null == def && defOrWrappedDef.ngModule || void 0, defType = void 0 === ngModule ? defOrWrappedDef : ngModule, isDuplicate = -1 !== dedupStack.indexOf(defType);
            void 0 !== ngModule && (def = getInjectorDef(ngModule));
            if (null == def) return !1;
            this.injectorDefTypes.add(defType);
            this.records.set(defType, makeRecord(def.factory, NOT_YET));
            if (null != def.imports && !isDuplicate) {
                dedupStack.push(defType);
                var importTypesWithProviders_1;
                try {
                    deepForEach(def.imports, function(imported) {
                        if (_this.processInjectorType(imported, parents, dedupStack)) {
                            void 0 === importTypesWithProviders_1 && (importTypesWithProviders_1 = []);
                            importTypesWithProviders_1.push(imported);
                        }
                    });
                } finally {}
                if (void 0 !== importTypesWithProviders_1) for (var _loop_1 = function(i) {
                    var _b = importTypesWithProviders_1[i], ngModule_1 = _b.ngModule, providers = _b.providers;
                    deepForEach(providers, function(provider) {
                        return _this.processProvider(provider, ngModule_1, providers || EMPTY_ARRAY);
                    });
                }, i = 0; i < importTypesWithProviders_1.length; i++) _loop_1(i);
            }
            var defProviders = def.providers;
            if (null != defProviders && !isDuplicate) {
                var injectorType_1 = defOrWrappedDef;
                deepForEach(defProviders, function(provider) {
                    return _this.processProvider(provider, injectorType_1, defProviders);
                });
            }
            return void 0 !== ngModule && void 0 !== defOrWrappedDef.providers;
        };
        R3Injector.prototype.processProvider = function(provider, ngModuleType, providers) {
            var token = isTypeProvider(provider = resolveForwardRef(provider)) ? provider : resolveForwardRef(provider && provider.provide), record = providerToRecord(provider, ngModuleType, providers);
            if (isTypeProvider(provider) || !0 !== provider.multi) {
                var existing = this.records.get(token);
                existing && void 0 !== existing.multi && throwMixedMultiProviderError();
            } else {
                var multiRecord_1 = this.records.get(token);
                if (multiRecord_1) void 0 === multiRecord_1.multi && throwMixedMultiProviderError(); else {
                    (multiRecord_1 = makeRecord(void 0, NOT_YET, !0)).factory = function() {
                        return injectArgs(multiRecord_1.multi);
                    };
                    this.records.set(token, multiRecord_1);
                }
                token = provider;
                multiRecord_1.multi.push(provider);
            }
            this.records.set(token, record);
        };
        R3Injector.prototype.hydrate = function(token, record) {
            if (record.value === CIRCULAR) throwCyclicDependencyError(stringify(token)); else if (record.value === NOT_YET) {
                record.value = CIRCULAR;
                record.value = record.factory();
            }
            "object" == typeof record.value && record.value && hasOnDestroy(record.value) && this.onDestroy.add(record.value);
            return record.value;
        };
        R3Injector.prototype.injectableDefInScope = function(def) {
            return !!def.providedIn && ("string" == typeof def.providedIn ? "any" === def.providedIn || "root" === def.providedIn && this.isRootInjector : this.injectorDefTypes.has(def.providedIn));
        };
        return R3Injector;
    }();
    function injectableDefOrInjectorDefFactory(token) {
        var injectableDef = getInjectableDef(token);
        if (null !== injectableDef) return injectableDef.factory;
        var injectorDef = getInjectorDef(token);
        if (null !== injectorDef) return injectorDef.factory;
        if (token instanceof InjectionToken) throw new Error("Token " + stringify(token) + " is missing an ngInjectableDef definition.");
        if (token instanceof Function) return getUndecoratedInjectableFactory(token);
        throw new Error("unreachable");
    }
    function getUndecoratedInjectableFactory(token) {
        var paramLength = token.length;
        if (paramLength > 0) {
            var args = new Array(paramLength).fill("?");
            throw new Error("Can't resolve all parameters for " + stringify(token) + ": (" + args.join(", ") + ").");
        }
        var inheritedInjectableDef = getInheritedInjectableDef(token);
        return null !== inheritedInjectableDef ? function() {
            return inheritedInjectableDef.factory(token);
        } : function() {
            return new token();
        };
    }
    function providerToRecord(provider, ngModuleType, providers) {
        var factory = providerToFactory(provider, ngModuleType, providers);
        return isValueProvider(provider) ? makeRecord(void 0, provider.useValue) : makeRecord(factory, NOT_YET);
    }
    function providerToFactory(provider, ngModuleType, providers) {
        var factory = void 0;
        if (isTypeProvider(provider)) return injectableDefOrInjectorDefFactory(resolveForwardRef(provider));
        if (isValueProvider(provider)) factory = function() {
            return resolveForwardRef(provider.useValue);
        }; else if (isExistingProvider(provider)) factory = function() {
            return ɵɵinject(resolveForwardRef(provider.useExisting));
        }; else if (isFactoryProvider(provider)) factory = function() {
            return provider.useFactory.apply(provider, injectArgs(provider.deps || []));
        }; else {
            var classRef_1 = resolveForwardRef(provider && (provider.useClass || provider.provide));
            classRef_1 || throwInvalidProviderError(ngModuleType, providers, provider);
            if (!hasDeps(provider)) return injectableDefOrInjectorDefFactory(classRef_1);
            factory = function() {
                return new (classRef_1.bind.apply(classRef_1, [ void 0 ].concat(injectArgs(provider.deps))))();
            };
        }
        return factory;
    }
    function makeRecord(factory, value, multi) {
        void 0 === multi && (multi = !1);
        return {
            factory: factory,
            value: value,
            multi: multi ? [] : void 0
        };
    }
    function deepForEach(input, fn) {
        input.forEach(function(value) {
            return Array.isArray(value) ? deepForEach(value, fn) : fn(value);
        });
    }
    function isValueProvider(value) {
        return null !== value && "object" == typeof value && USE_VALUE in value;
    }
    function isExistingProvider(value) {
        return !(!value || !value.useExisting);
    }
    function isFactoryProvider(value) {
        return !(!value || !value.useFactory);
    }
    function isTypeProvider(value) {
        return "function" == typeof value;
    }
    function isClassProvider(value) {
        return !!value.useClass;
    }
    function hasDeps(value) {
        return !!value.deps;
    }
    function hasOnDestroy(value) {
        return null !== value && "object" == typeof value && "function" == typeof value.ngOnDestroy;
    }
    function couldBeInjectableType(value) {
        return "function" == typeof value || "object" == typeof value && value instanceof InjectionToken;
    }
    function INJECTOR_IMPL__POST_R3__(providers, parent, name) {
        return createInjector({
            name: name
        }, parent, providers, name);
    }
    var INJECTOR_IMPL = INJECTOR_IMPL__POST_R3__, Injector = function() {
        function Injector() {}
        Injector.create = function(options, parent) {
            return Array.isArray(options) ? INJECTOR_IMPL(options, parent, "") : INJECTOR_IMPL(options.providers, options.parent, options.name || "");
        };
        return Injector;
    }();
    Injector.THROW_IF_NOT_FOUND = THROW_IF_NOT_FOUND;
    Injector.NULL = new NullInjector();
    Injector.ngInjectableDef = ɵɵdefineInjectable({
        providedIn: "any",
        factory: function() {
            return ɵɵinject(INJECTOR);
        }
    });
    Injector.__NG_ELEMENT_ID__ = -1;
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    var ERROR_DEBUG_CONTEXT = "ngDebugContext", ERROR_ORIGINAL_ERROR = "ngOriginalError", ERROR_LOGGER = "ngErrorLogger";
    function wrappedError(message, originalError) {
        var msg = message + " caused by: " + (originalError instanceof Error ? originalError.message : originalError), error = Error(msg);
        error[ERROR_ORIGINAL_ERROR] = originalError;
        return error;
    }
    function findFirstClosedCycle(keys) {
        for (var res = [], i = 0; i < keys.length; ++i) {
            if (res.indexOf(keys[i]) > -1) {
                res.push(keys[i]);
                return res;
            }
            res.push(keys[i]);
        }
        return res;
    }
    function constructResolvingPath(keys) {
        return keys.length > 1 ? " (" + findFirstClosedCycle(keys.slice().reverse()).map(function(k) {
            return stringify(k.token);
        }).join(" -> ") + ")" : "";
    }
    function injectionError(injector, key, constructResolvingMessage, originalError) {
        var keys = [ key ], errMsg = constructResolvingMessage(keys), error = originalError ? wrappedError(errMsg, originalError) : Error(errMsg);
        error.addKey = addKey;
        error.keys = keys;
        error.injectors = [ injector ];
        error.constructResolvingMessage = constructResolvingMessage;
        error[ERROR_ORIGINAL_ERROR] = originalError;
        return error;
    }
    function addKey(injector, key) {
        this.injectors.push(injector);
        this.keys.push(key);
        this.message = this.constructResolvingMessage(this.keys);
    }
    function noProviderError(injector, key) {
        return injectionError(injector, key, function(keys) {
            return "No provider for " + stringify(keys[0].token) + "!" + constructResolvingPath(keys);
        });
    }
    function cyclicDependencyError(injector, key) {
        return injectionError(injector, key, function(keys) {
            return "Cannot instantiate cyclic dependency!" + constructResolvingPath(keys);
        });
    }
    function instantiationError(injector, originalException, originalStack, key) {
        return injectionError(injector, key, function(keys) {
            var first = stringify(keys[0].token);
            return originalException.message + ": Error during instantiation of " + first + "!" + constructResolvingPath(keys) + ".";
        }, originalException);
    }
    function invalidProviderError(provider) {
        return Error("Invalid provider - only instances of Provider and Type are allowed, got: " + provider);
    }
    function noAnnotationError(typeOrFunc, params) {
        for (var signature = [], i = 0, ii = params.length; i < ii; i++) {
            var parameter = params[i];
            signature.push(parameter && 0 != parameter.length ? parameter.map(stringify).join(" ") : "?");
        }
        return Error("Cannot resolve all parameters for '" + stringify(typeOrFunc) + "'(" + signature.join(", ") + "). Make sure that all the parameters are decorated with Inject or have valid type annotations and that '" + stringify(typeOrFunc) + "' is decorated with Injectable.");
    }
    function outOfBoundsError(index) {
        return Error("Index " + index + " is out-of-bounds.");
    }
    function mixingMultiProvidersWithRegularProvidersError(provider1, provider2) {
        return Error("Cannot mix multi providers and regular providers, got: " + provider1 + " " + provider2);
    }
    var ReflectiveKey = function() {
        function ReflectiveKey(token, id) {
            this.token = token;
            this.id = id;
            if (!token) throw new Error("Token must be defined!");
            this.displayName = stringify(this.token);
        }
        ReflectiveKey.get = function(token) {
            return _globalKeyRegistry.get(resolveForwardRef(token));
        };
        Object.defineProperty(ReflectiveKey, "numberOfKeys", {
            get: function() {
                return _globalKeyRegistry.numberOfKeys;
            },
            enumerable: !0,
            configurable: !0
        });
        return ReflectiveKey;
    }(), _globalKeyRegistry = new (function() {
        function KeyRegistry() {
            this._allKeys = new Map();
        }
        KeyRegistry.prototype.get = function(token) {
            if (token instanceof ReflectiveKey) return token;
            if (this._allKeys.has(token)) return this._allKeys.get(token);
            var newKey = new ReflectiveKey(token, ReflectiveKey.numberOfKeys);
            this._allKeys.set(token, newKey);
            return newKey;
        };
        Object.defineProperty(KeyRegistry.prototype, "numberOfKeys", {
            get: function() {
                return this._allKeys.size;
            },
            enumerable: !0,
            configurable: !0
        });
        return KeyRegistry;
    }())(), reflector = new (function() {
        function Reflector(reflectionCapabilities) {
            this.reflectionCapabilities = reflectionCapabilities;
        }
        Reflector.prototype.updateCapabilities = function(caps) {
            this.reflectionCapabilities = caps;
        };
        Reflector.prototype.factory = function(type) {
            return this.reflectionCapabilities.factory(type);
        };
        Reflector.prototype.parameters = function(typeOrFunc) {
            return this.reflectionCapabilities.parameters(typeOrFunc);
        };
        Reflector.prototype.annotations = function(typeOrFunc) {
            return this.reflectionCapabilities.annotations(typeOrFunc);
        };
        Reflector.prototype.propMetadata = function(typeOrFunc) {
            return this.reflectionCapabilities.propMetadata(typeOrFunc);
        };
        Reflector.prototype.hasLifecycleHook = function(type, lcProperty) {
            return this.reflectionCapabilities.hasLifecycleHook(type, lcProperty);
        };
        Reflector.prototype.getter = function(name) {
            return this.reflectionCapabilities.getter(name);
        };
        Reflector.prototype.setter = function(name) {
            return this.reflectionCapabilities.setter(name);
        };
        Reflector.prototype.method = function(name) {
            return this.reflectionCapabilities.method(name);
        };
        Reflector.prototype.importUri = function(type) {
            return this.reflectionCapabilities.importUri(type);
        };
        Reflector.prototype.resourceUri = function(type) {
            return this.reflectionCapabilities.resourceUri(type);
        };
        Reflector.prototype.resolveIdentifier = function(name, moduleUrl, members, runtime) {
            return this.reflectionCapabilities.resolveIdentifier(name, moduleUrl, members, runtime);
        };
        Reflector.prototype.resolveEnum = function(identifier, name) {
            return this.reflectionCapabilities.resolveEnum(identifier, name);
        };
        return Reflector;
    }())(new ReflectionCapabilities()), ReflectiveDependency = function() {
        function ReflectiveDependency(key, optional, visibility) {
            this.key = key;
            this.optional = optional;
            this.visibility = visibility;
        }
        ReflectiveDependency.fromKey = function(key) {
            return new ReflectiveDependency(key, !1, null);
        };
        return ReflectiveDependency;
    }(), _EMPTY_LIST = [], ResolvedReflectiveProvider_ = function() {
        function ResolvedReflectiveProvider_(key, resolvedFactories, multiProvider) {
            this.key = key;
            this.resolvedFactories = resolvedFactories;
            this.multiProvider = multiProvider;
            this.resolvedFactory = this.resolvedFactories[0];
        }
        return ResolvedReflectiveProvider_;
    }(), ResolvedReflectiveFactory = function() {
        function ResolvedReflectiveFactory(factory, dependencies) {
            this.factory = factory;
            this.dependencies = dependencies;
        }
        return ResolvedReflectiveFactory;
    }();
    function resolveReflectiveFactory(provider) {
        var factoryFn, resolvedDeps;
        if (provider.useClass) {
            var useClass = resolveForwardRef(provider.useClass);
            factoryFn = reflector.factory(useClass);
            resolvedDeps = _dependenciesFor(useClass);
        } else if (provider.useExisting) {
            factoryFn = function(aliasInstance) {
                return aliasInstance;
            };
            resolvedDeps = [ ReflectiveDependency.fromKey(ReflectiveKey.get(provider.useExisting)) ];
        } else if (provider.useFactory) {
            factoryFn = provider.useFactory;
            resolvedDeps = constructDependencies(provider.useFactory, provider.deps);
        } else {
            factoryFn = function() {
                return provider.useValue;
            };
            resolvedDeps = _EMPTY_LIST;
        }
        return new ResolvedReflectiveFactory(factoryFn, resolvedDeps);
    }
    function resolveReflectiveProvider(provider) {
        return new ResolvedReflectiveProvider_(ReflectiveKey.get(provider.provide), [ resolveReflectiveFactory(provider) ], provider.multi || !1);
    }
    function resolveReflectiveProviders(providers) {
        var resolvedProviderMap = mergeResolvedReflectiveProviders(_normalizeProviders(providers, []).map(resolveReflectiveProvider), new Map());
        return Array.from(resolvedProviderMap.values());
    }
    function mergeResolvedReflectiveProviders(providers, normalizedProvidersMap) {
        for (var i = 0; i < providers.length; i++) {
            var provider = providers[i], existing = normalizedProvidersMap.get(provider.key.id);
            if (existing) {
                if (provider.multiProvider !== existing.multiProvider) throw mixingMultiProvidersWithRegularProvidersError(existing, provider);
                if (provider.multiProvider) for (var j = 0; j < provider.resolvedFactories.length; j++) existing.resolvedFactories.push(provider.resolvedFactories[j]); else normalizedProvidersMap.set(provider.key.id, provider);
            } else {
                var resolvedProvider = void 0;
                resolvedProvider = provider.multiProvider ? new ResolvedReflectiveProvider_(provider.key, provider.resolvedFactories.slice(), provider.multiProvider) : provider;
                normalizedProvidersMap.set(provider.key.id, resolvedProvider);
            }
        }
        return normalizedProvidersMap;
    }
    function _normalizeProviders(providers, res) {
        providers.forEach(function(b) {
            if (b instanceof Type) res.push({
                provide: b,
                useClass: b
            }); else if (b && "object" == typeof b && void 0 !== b.provide) res.push(b); else {
                if (!(b instanceof Array)) throw invalidProviderError(b);
                _normalizeProviders(b, res);
            }
        });
        return res;
    }
    function constructDependencies(typeOrFunc, dependencies) {
        if (dependencies) {
            var params_1 = dependencies.map(function(t) {
                return [ t ];
            });
            return dependencies.map(function(t) {
                return _extractToken(typeOrFunc, t, params_1);
            });
        }
        return _dependenciesFor(typeOrFunc);
    }
    function _dependenciesFor(typeOrFunc) {
        var params = reflector.parameters(typeOrFunc);
        if (!params) return [];
        if (params.some(function(p) {
            return null == p;
        })) throw noAnnotationError(typeOrFunc, params);
        return params.map(function(p) {
            return _extractToken(typeOrFunc, p, params);
        });
    }
    function _extractToken(typeOrFunc, metadata, params) {
        var token = null, optional = !1;
        if (!Array.isArray(metadata)) return _createDependency(metadata instanceof Inject ? metadata.token : metadata, optional, null);
        for (var visibility = null, i = 0; i < metadata.length; ++i) {
            var paramMetadata = metadata[i];
            paramMetadata instanceof Type ? token = paramMetadata : paramMetadata instanceof Inject ? token = paramMetadata.token : paramMetadata instanceof Optional ? optional = !0 : paramMetadata instanceof Self || paramMetadata instanceof SkipSelf ? visibility = paramMetadata : paramMetadata instanceof InjectionToken && (token = paramMetadata);
        }
        if (null != (token = resolveForwardRef(token))) return _createDependency(token, optional, visibility);
        throw noAnnotationError(typeOrFunc, params);
    }
    function _createDependency(token, optional, visibility) {
        return new ReflectiveDependency(ReflectiveKey.get(token), optional, visibility);
    }
    var UNDEFINED = new Object(), ReflectiveInjector = function() {
        function ReflectiveInjector() {}
        ReflectiveInjector.resolve = function(providers) {
            return resolveReflectiveProviders(providers);
        };
        ReflectiveInjector.resolveAndCreate = function(providers, parent) {
            var ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
            return ReflectiveInjector.fromResolvedProviders(ResolvedReflectiveProviders, parent);
        };
        ReflectiveInjector.fromResolvedProviders = function(providers, parent) {
            return new ReflectiveInjector_(providers, parent);
        };
        return ReflectiveInjector;
    }(), ReflectiveInjector_ = function() {
        function ReflectiveInjector_(_providers, _parent) {
            this._constructionCounter = 0;
            this._providers = _providers;
            this.parent = _parent || null;
            var len = _providers.length;
            this.keyIds = new Array(len);
            this.objs = new Array(len);
            for (var i = 0; i < len; i++) {
                this.keyIds[i] = _providers[i].key.id;
                this.objs[i] = UNDEFINED;
            }
        }
        ReflectiveInjector_.prototype.get = function(token, notFoundValue) {
            void 0 === notFoundValue && (notFoundValue = THROW_IF_NOT_FOUND);
            return this._getByKey(ReflectiveKey.get(token), null, notFoundValue);
        };
        ReflectiveInjector_.prototype.resolveAndCreateChild = function(providers) {
            var ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
            return this.createChildFromResolved(ResolvedReflectiveProviders);
        };
        ReflectiveInjector_.prototype.createChildFromResolved = function(providers) {
            var inj = new ReflectiveInjector_(providers);
            inj.parent = this;
            return inj;
        };
        ReflectiveInjector_.prototype.resolveAndInstantiate = function(provider) {
            return this.instantiateResolved(ReflectiveInjector.resolve([ provider ])[0]);
        };
        ReflectiveInjector_.prototype.instantiateResolved = function(provider) {
            return this._instantiateProvider(provider);
        };
        ReflectiveInjector_.prototype.getProviderAtIndex = function(index) {
            if (index < 0 || index >= this._providers.length) throw outOfBoundsError(index);
            return this._providers[index];
        };
        ReflectiveInjector_.prototype._new = function(provider) {
            if (this._constructionCounter++ > this._getMaxNumberOfObjects()) throw cyclicDependencyError(this, provider.key);
            return this._instantiateProvider(provider);
        };
        ReflectiveInjector_.prototype._getMaxNumberOfObjects = function() {
            return this.objs.length;
        };
        ReflectiveInjector_.prototype._instantiateProvider = function(provider) {
            if (provider.multiProvider) {
                for (var res = new Array(provider.resolvedFactories.length), i = 0; i < provider.resolvedFactories.length; ++i) res[i] = this._instantiate(provider, provider.resolvedFactories[i]);
                return res;
            }
            return this._instantiate(provider, provider.resolvedFactories[0]);
        };
        ReflectiveInjector_.prototype._instantiate = function(provider, ResolvedReflectiveFactory) {
            var deps, obj, _this = this, factory = ResolvedReflectiveFactory.factory;
            try {
                deps = ResolvedReflectiveFactory.dependencies.map(function(dep) {
                    return _this._getByReflectiveDependency(dep);
                });
            } catch (e) {
                e.addKey && e.addKey(this, provider.key);
                throw e;
            }
            try {
                obj = factory.apply(void 0, deps);
            } catch (e) {
                throw instantiationError(this, e, e.stack, provider.key);
            }
            return obj;
        };
        ReflectiveInjector_.prototype._getByReflectiveDependency = function(dep) {
            return this._getByKey(dep.key, dep.visibility, dep.optional ? null : THROW_IF_NOT_FOUND);
        };
        ReflectiveInjector_.prototype._getByKey = function(key, visibility, notFoundValue) {
            return key === ReflectiveInjector_.INJECTOR_KEY ? this : visibility instanceof Self ? this._getByKeySelf(key, notFoundValue) : this._getByKeyDefault(key, notFoundValue, visibility);
        };
        ReflectiveInjector_.prototype._getObjByKeyId = function(keyId) {
            for (var i = 0; i < this.keyIds.length; i++) if (this.keyIds[i] === keyId) {
                this.objs[i] === UNDEFINED && (this.objs[i] = this._new(this._providers[i]));
                return this.objs[i];
            }
            return UNDEFINED;
        };
        ReflectiveInjector_.prototype._throwOrNull = function(key, notFoundValue) {
            if (notFoundValue !== THROW_IF_NOT_FOUND) return notFoundValue;
            throw noProviderError(this, key);
        };
        ReflectiveInjector_.prototype._getByKeySelf = function(key, notFoundValue) {
            var obj = this._getObjByKeyId(key.id);
            return obj !== UNDEFINED ? obj : this._throwOrNull(key, notFoundValue);
        };
        ReflectiveInjector_.prototype._getByKeyDefault = function(key, notFoundValue, visibility) {
            var inj;
            inj = visibility instanceof SkipSelf ? this.parent : this;
            for (;inj instanceof ReflectiveInjector_; ) {
                var inj_ = inj, obj = inj_._getObjByKeyId(key.id);
                if (obj !== UNDEFINED) return obj;
                inj = inj_.parent;
            }
            return null !== inj ? inj.get(key.token, notFoundValue) : this._throwOrNull(key, notFoundValue);
        };
        Object.defineProperty(ReflectiveInjector_.prototype, "displayName", {
            get: function() {
                return "ReflectiveInjector(providers: [" + _mapProviders(this, function(b) {
                    return ' "' + b.key.displayName + '" ';
                }).join(", ") + "])";
            },
            enumerable: !0,
            configurable: !0
        });
        ReflectiveInjector_.prototype.toString = function() {
            return this.displayName;
        };
        return ReflectiveInjector_;
    }();
    ReflectiveInjector_.INJECTOR_KEY = ReflectiveKey.get(Injector);
    function _mapProviders(injector, fn) {
        for (var res = new Array(injector._providers.length), i = 0; i < injector._providers.length; ++i) res[i] = fn(injector.getProviderAtIndex(i));
        return res;
    }
    new InjectionToken("AnalyzeForEntryComponents");
    var Query = function() {
        function Query() {}
        return Query;
    }(), ChangeDetectionStrategy = (makePropDecorator("ContentChildren", function(selector, data) {
        void 0 === data && (data = {});
        return Object.assign({
            selector: selector,
            first: !1,
            isViewQuery: !1,
            descendants: !1
        }, data);
    }, Query), makePropDecorator("ContentChild", function(selector, data) {
        void 0 === data && (data = {});
        return Object.assign({
            selector: selector,
            first: !0,
            isViewQuery: !1,
            descendants: !0
        }, data);
    }, Query), makePropDecorator("ViewChildren", function(selector, data) {
        void 0 === data && (data = {});
        return Object.assign({
            selector: selector,
            first: !1,
            isViewQuery: !0,
            descendants: !0
        }, data);
    }, Query), makePropDecorator("ViewChild", function(selector, data) {
        return Object.assign({
            selector: selector,
            first: !0,
            isViewQuery: !0,
            descendants: !0
        }, data);
    }, Query), {
        OnPush: 0,
        Default: 1
    });
    ChangeDetectionStrategy[ChangeDetectionStrategy.OnPush] = "OnPush";
    ChangeDetectionStrategy[ChangeDetectionStrategy.Default] = "Default";
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    function resolveComponentResources(resourceResolver) {
        var componentResolved = [], urlMap = new Map();
        function cachedResourceResolve(url) {
            var promise = urlMap.get(url);
            if (!promise) {
                var resp = resourceResolver(url);
                urlMap.set(url, promise = resp.then(unwrapResponse));
            }
            return promise;
        }
        componentResourceResolutionQueue.forEach(function(component, type) {
            var promises = [];
            component.templateUrl && promises.push(cachedResourceResolve(component.templateUrl).then(function(template) {
                component.template = template;
            }));
            var styleUrls = component.styleUrls, styles = component.styles || (component.styles = []), styleOffset = component.styles.length;
            styleUrls && styleUrls.forEach(function(styleUrl, index) {
                styles.push("");
                promises.push(cachedResourceResolve(styleUrl).then(function(style) {
                    styles[styleOffset + index] = style;
                    styleUrls.splice(styleUrls.indexOf(styleUrl), 1);
                    0 == styleUrls.length && (component.styleUrls = void 0);
                }));
            });
            var fullyResolved = Promise.all(promises).then(function() {
                return componentDefResolved(type);
            });
            componentResolved.push(fullyResolved);
        });
        clearResolutionOfComponentResourcesQueue();
        return Promise.all(componentResolved).then(function() {});
    }
    var componentResourceResolutionQueue = new Map(), componentDefPendingResolution = new Set();
    function maybeQueueResolutionOfComponentResources(type, metadata) {
        if (componentNeedsResolution(metadata)) {
            componentResourceResolutionQueue.set(type, metadata);
            componentDefPendingResolution.add(type);
        }
    }
    function componentNeedsResolution(component) {
        return !!(component.templateUrl && !component.hasOwnProperty("template") || component.styleUrls && component.styleUrls.length);
    }
    function clearResolutionOfComponentResourcesQueue() {
        var old = componentResourceResolutionQueue;
        componentResourceResolutionQueue = new Map();
        return old;
    }
    function isComponentResourceResolutionQueueEmpty() {
        return 0 === componentResourceResolutionQueue.size;
    }
    function unwrapResponse(response) {
        return "string" == typeof response ? response : response.text();
    }
    function componentDefResolved(type) {
        componentDefPendingResolution.delete(type);
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    var ViewEncapsulation = {
        Emulated: 0,
        Native: 1,
        None: 2,
        ShadowDom: 3
    };
    ViewEncapsulation[ViewEncapsulation.Emulated] = "Emulated";
    ViewEncapsulation[ViewEncapsulation.Native] = "Native";
    ViewEncapsulation[ViewEncapsulation.None] = "None";
    ViewEncapsulation[ViewEncapsulation.ShadowDom] = "ShadowDom";
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    function noSideEffects(fn) {
        return "" + {
            toString: fn
        };
    }
    var EMPTY_OBJ = {}, EMPTY_ARRAY$1 = [], NG_COMPONENT_DEF = getClosureSafeProperty({
        ngComponentDef: getClosureSafeProperty
    }), NG_DIRECTIVE_DEF = getClosureSafeProperty({
        ngDirectiveDef: getClosureSafeProperty
    }), NG_PIPE_DEF = getClosureSafeProperty({
        ngPipeDef: getClosureSafeProperty
    }), NG_MODULE_DEF = getClosureSafeProperty({
        ngModuleDef: getClosureSafeProperty
    }), NG_LOCALE_ID_DEF = getClosureSafeProperty({
        ngLocaleIdDef: getClosureSafeProperty
    }), NG_BASE_DEF = getClosureSafeProperty({
        ngBaseDef: getClosureSafeProperty
    }), NG_ELEMENT_ID = getClosureSafeProperty({
        __NG_ELEMENT_ID__: getClosureSafeProperty
    }), _renderCompCount = 0;
    function ɵɵdefineComponent(componentDefinition) {
        var type = componentDefinition.type, typePrototype = type.prototype, declaredInputs = {}, def = {
            type: type,
            providersResolver: null,
            consts: componentDefinition.consts,
            vars: componentDefinition.vars,
            factory: componentDefinition.factory,
            template: componentDefinition.template || null,
            ngContentSelectors: componentDefinition.ngContentSelectors,
            hostBindings: componentDefinition.hostBindings || null,
            contentQueries: componentDefinition.contentQueries || null,
            declaredInputs: declaredInputs,
            inputs: null,
            outputs: null,
            exportAs: componentDefinition.exportAs || null,
            onChanges: null,
            onInit: typePrototype.ngOnInit || null,
            doCheck: typePrototype.ngDoCheck || null,
            afterContentInit: typePrototype.ngAfterContentInit || null,
            afterContentChecked: typePrototype.ngAfterContentChecked || null,
            afterViewInit: typePrototype.ngAfterViewInit || null,
            afterViewChecked: typePrototype.ngAfterViewChecked || null,
            onDestroy: typePrototype.ngOnDestroy || null,
            onPush: componentDefinition.changeDetection === ChangeDetectionStrategy.OnPush,
            directiveDefs: null,
            pipeDefs: null,
            selectors: componentDefinition.selectors,
            viewQuery: componentDefinition.viewQuery || null,
            features: componentDefinition.features || null,
            data: componentDefinition.data || {},
            encapsulation: componentDefinition.encapsulation || ViewEncapsulation.Emulated,
            id: "c",
            styles: componentDefinition.styles || EMPTY_ARRAY$1,
            _: null,
            setInput: null,
            schemas: componentDefinition.schemas || null,
            tView: null
        };
        def._ = noSideEffects(function() {
            var directiveTypes = componentDefinition.directives, feature = componentDefinition.features, pipeTypes = componentDefinition.pipes;
            def.id += _renderCompCount++;
            def.inputs = invertObject(componentDefinition.inputs, declaredInputs), def.outputs = invertObject(componentDefinition.outputs), 
            feature && feature.forEach(function(fn) {
                return fn(def);
            });
            def.directiveDefs = directiveTypes ? function() {
                return ("function" == typeof directiveTypes ? directiveTypes() : directiveTypes).map(extractDirectiveDef);
            } : null;
            def.pipeDefs = pipeTypes ? function() {
                return ("function" == typeof pipeTypes ? pipeTypes() : pipeTypes).map(extractPipeDef);
            } : null;
            type.hasOwnProperty(NG_INJECTABLE_DEF) || (type[NG_INJECTABLE_DEF] = ɵɵdefineInjectable({
                factory: componentDefinition.factory
            }));
        });
        return def;
    }
    function ɵɵsetComponentScope(type, directives, pipes) {
        var def = type.ngComponentDef;
        def.directiveDefs = function() {
            return directives.map(extractDirectiveDef);
        };
        def.pipeDefs = function() {
            return pipes.map(extractPipeDef);
        };
    }
    function extractDirectiveDef(type) {
        return getComponentDef(type) || getDirectiveDef(type);
    }
    function extractPipeDef(type) {
        return getPipeDef(type);
    }
    function ɵɵdefineNgModule(def) {
        return {
            type: def.type,
            bootstrap: def.bootstrap || EMPTY_ARRAY$1,
            declarations: def.declarations || EMPTY_ARRAY$1,
            imports: def.imports || EMPTY_ARRAY$1,
            exports: def.exports || EMPTY_ARRAY$1,
            transitiveCompileScopes: null,
            schemas: def.schemas || null,
            id: def.id || null
        };
    }
    function ɵɵsetNgModuleScope(type, scope) {
        return noSideEffects(function() {
            var ngModuleDef = getNgModuleDef(type, !0);
            ngModuleDef.declarations = scope.declarations || EMPTY_ARRAY$1;
            ngModuleDef.imports = scope.imports || EMPTY_ARRAY$1;
            ngModuleDef.exports = scope.exports || EMPTY_ARRAY$1;
        });
    }
    function invertObject(obj, secondary) {
        if (null == obj) return EMPTY_OBJ;
        var newLookup = {};
        for (var minifiedKey in obj) if (obj.hasOwnProperty(minifiedKey)) {
            var publicName = obj[minifiedKey], declaredName = publicName;
            if (Array.isArray(publicName)) {
                declaredName = publicName[1];
                publicName = publicName[0];
            }
            newLookup[publicName] = minifiedKey;
            secondary && (secondary[publicName] = declaredName);
        }
        return newLookup;
    }
    function ɵɵdefineBase(baseDefinition) {
        var declaredInputs = {};
        return {
            inputs: invertObject(baseDefinition.inputs, declaredInputs),
            declaredInputs: declaredInputs,
            outputs: invertObject(baseDefinition.outputs),
            viewQuery: baseDefinition.viewQuery || null,
            contentQueries: baseDefinition.contentQueries || null,
            hostBindings: baseDefinition.hostBindings || null
        };
    }
    var ɵɵdefineDirective = ɵɵdefineComponent;
    function ɵɵdefinePipe(pipeDef) {
        return {
            name: pipeDef.name,
            factory: pipeDef.factory,
            pure: !1 !== pipeDef.pure,
            onDestroy: pipeDef.type.prototype.ngOnDestroy || null
        };
    }
    function getComponentDef(type) {
        return type[NG_COMPONENT_DEF] || null;
    }
    function getDirectiveDef(type) {
        return type[NG_DIRECTIVE_DEF] || null;
    }
    function getPipeDef(type) {
        return type[NG_PIPE_DEF] || null;
    }
    function getBaseDef(type) {
        return type[NG_BASE_DEF] || null;
    }
    function getNgModuleDef(type, throwNotFound) {
        var ngModuleDef = type[NG_MODULE_DEF] || null;
        if (!ngModuleDef && !0 === throwNotFound) throw new Error("Type " + stringify(type) + " does not have 'ngModuleDef' property.");
        return ngModuleDef;
    }
    function getNgLocaleIdDef(type) {
        return type[NG_LOCALE_ID_DEF] || null;
    }
    function isDifferent(a, b) {
        return !(a != a && b != b) && a !== b;
    }
    function renderStringify(value) {
        return "function" == typeof value ? value.name || value : "string" == typeof value ? value : null == value ? "" : "" + value;
    }
    function stringifyForError(value) {
        return "object" == typeof value && null != value && "function" == typeof value.type ? value.type.name || value.type : renderStringify(value);
    }
    var defaultScheduler = ("undefined" != typeof requestAnimationFrame && requestAnimationFrame || setTimeout).bind(_global);
    function ɵɵresolveWindow(element) {
        return {
            name: "window",
            target: element.ownerDocument.defaultView
        };
    }
    function ɵɵresolveDocument(element) {
        return {
            name: "document",
            target: element.ownerDocument
        };
    }
    function ɵɵresolveBody(element) {
        return {
            name: "body",
            target: element.ownerDocument.body
        };
    }
    var INTERPOLATION_DELIMITER = "�";
    function maybeUnwrapFn(value) {
        return value instanceof Function ? value() : value;
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    var HOST = 0, TVIEW = 1, FLAGS = 2, PARENT = 3, NEXT = 4, QUERIES = 5, T_HOST = 6, BINDING_INDEX = 7, CLEANUP = 8, CONTEXT = 9, INJECTOR$1 = 10, RENDERER_FACTORY = 11, RENDERER = 12, SANITIZER = 13, CHILD_HEAD = 14, CHILD_TAIL = 15, CONTENT_QUERIES = 16, DECLARATION_VIEW = 17, PREORDER_HOOK_FLAGS = 18, HEADER_OFFSET = 20;
    function assertGreaterThan(actual, expected, msg) {
        actual <= expected && throwError(msg);
    }
    function assertDefined(actual, msg) {
        null == actual && throwError(msg);
    }
    function throwError(msg) {
        throw new Error("ASSERTION ERROR: " + msg);
    }
    var TYPE = 1, ACTIVE_INDEX = 2, NATIVE = 7, CONTAINER_HEADER_OFFSET = 8, MONKEY_PATCH_KEY_NAME = "__ngContext__";
    function unwrapRNode(value) {
        for (;Array.isArray(value); ) value = value[HOST];
        return value;
    }
    function isLView(value) {
        return Array.isArray(value) && "object" == typeof value[TYPE];
    }
    function isLContainer(value) {
        return Array.isArray(value) && !0 === value[TYPE];
    }
    function isStylingContext(value) {
        return Array.isArray(value) && "number" == typeof value[TYPE];
    }
    function getNativeByIndex(index, lView) {
        return unwrapRNode(lView[index + HEADER_OFFSET]);
    }
    function getNativeByTNode(tNode, hostView) {
        return unwrapRNode(hostView[tNode.index]);
    }
    function hasDirectives(tNode) {
        return tNode.directiveEnd > tNode.directiveStart;
    }
    function getTNode(index, view) {
        return view[TVIEW].data[index + HEADER_OFFSET];
    }
    function loadInternal(view, index) {
        return view[index + HEADER_OFFSET];
    }
    function getComponentViewByIndex(nodeIndex, hostView) {
        var slotValue = hostView[nodeIndex];
        return isLView(slotValue) ? slotValue : slotValue[HOST];
    }
    function isContentQueryHost(tNode) {
        return 0 != (4 & tNode.flags);
    }
    function isComponent(tNode) {
        return 1 == (1 & tNode.flags);
    }
    function isComponentDef(def) {
        return null !== def.template;
    }
    function isRootView(target) {
        return 0 != (512 & target[FLAGS]);
    }
    function readPatchedData(target) {
        return target[MONKEY_PATCH_KEY_NAME];
    }
    function readPatchedLView(target) {
        var value = readPatchedData(target);
        return value ? Array.isArray(value) ? value : value.lView : null;
    }
    function viewAttachedToChangeDetector(view) {
        return 128 == (128 & view[FLAGS]);
    }
    function viewAttachedToContainer(view) {
        return isLContainer(view[PARENT]);
    }
    function resetPreOrderHookFlags(lView) {
        lView[PREORDER_HOOK_FLAGS] = 0;
    }
    function registerPreOrderHooks(directiveIndex, directiveDef, tView, nodeIndex, initialPreOrderHooksLength, initialPreOrderCheckHooksLength) {
        var onChanges = directiveDef.onChanges, onInit = directiveDef.onInit, doCheck = directiveDef.doCheck;
        initialPreOrderHooksLength >= 0 && (!tView.preOrderHooks || initialPreOrderHooksLength === tView.preOrderHooks.length) && (onChanges || onInit || doCheck) && (tView.preOrderHooks || (tView.preOrderHooks = [])).push(nodeIndex);
        initialPreOrderCheckHooksLength >= 0 && (!tView.preOrderCheckHooks || initialPreOrderCheckHooksLength === tView.preOrderCheckHooks.length) && (onChanges || doCheck) && (tView.preOrderCheckHooks || (tView.preOrderCheckHooks = [])).push(nodeIndex);
        if (onChanges) {
            (tView.preOrderHooks || (tView.preOrderHooks = [])).push(directiveIndex, onChanges);
            (tView.preOrderCheckHooks || (tView.preOrderCheckHooks = [])).push(directiveIndex, onChanges);
        }
        onInit && (tView.preOrderHooks || (tView.preOrderHooks = [])).push(-directiveIndex, onInit);
        if (doCheck) {
            (tView.preOrderHooks || (tView.preOrderHooks = [])).push(directiveIndex, doCheck);
            (tView.preOrderCheckHooks || (tView.preOrderCheckHooks = [])).push(directiveIndex, doCheck);
        }
    }
    function registerPostOrderHooks(tView, tNode) {
        if (tView.firstTemplatePass) for (var i = tNode.directiveStart, end = tNode.directiveEnd; i < end; i++) {
            var directiveDef = tView.data[i];
            directiveDef.afterContentInit && (tView.contentHooks || (tView.contentHooks = [])).push(-i, directiveDef.afterContentInit);
            if (directiveDef.afterContentChecked) {
                (tView.contentHooks || (tView.contentHooks = [])).push(i, directiveDef.afterContentChecked);
                (tView.contentCheckHooks || (tView.contentCheckHooks = [])).push(i, directiveDef.afterContentChecked);
            }
            directiveDef.afterViewInit && (tView.viewHooks || (tView.viewHooks = [])).push(-i, directiveDef.afterViewInit);
            if (directiveDef.afterViewChecked) {
                (tView.viewHooks || (tView.viewHooks = [])).push(i, directiveDef.afterViewChecked);
                (tView.viewCheckHooks || (tView.viewCheckHooks = [])).push(i, directiveDef.afterViewChecked);
            }
            null != directiveDef.onDestroy && (tView.destroyHooks || (tView.destroyHooks = [])).push(i, directiveDef.onDestroy);
        }
    }
    function executePreOrderHooks(currentView, tView, checkNoChangesMode, currentNodeIndex) {
        checkNoChangesMode || executeHooks(currentView, tView.preOrderHooks, tView.preOrderCheckHooks, checkNoChangesMode, 0, void 0 !== currentNodeIndex ? currentNodeIndex : null);
    }
    function executeHooks(currentView, firstPassHooks, checkHooks, checkNoChangesMode, initPhaseState, currentNodeIndex) {
        if (!checkNoChangesMode) {
            var hooksToCall = (3 & currentView[FLAGS]) === initPhaseState ? firstPassHooks : checkHooks;
            hooksToCall && callHooks(currentView, hooksToCall, initPhaseState, currentNodeIndex);
            if (null == currentNodeIndex && (3 & currentView[FLAGS]) === initPhaseState && 3 !== initPhaseState) {
                currentView[FLAGS] &= 1023;
                currentView[FLAGS] += 1;
            }
        }
    }
    function callHooks(currentView, arr, initPhase, currentNodeIndex) {
        for (var nodeIndexLimit = null != currentNodeIndex ? currentNodeIndex : -1, lastNodeIndexFound = 0, i = void 0 !== currentNodeIndex ? 65535 & currentView[PREORDER_HOOK_FLAGS] : 0; i < arr.length; i++) if ("number" == typeof arr[i + 1]) {
            lastNodeIndexFound = arr[i];
            if (null != currentNodeIndex && lastNodeIndexFound >= currentNodeIndex) break;
        } else {
            arr[i] < 0 && (currentView[PREORDER_HOOK_FLAGS] += 65536);
            if (lastNodeIndexFound < nodeIndexLimit || -1 == nodeIndexLimit) {
                callHook(currentView, initPhase, arr, i);
                currentView[PREORDER_HOOK_FLAGS] = (4294901760 & currentView[PREORDER_HOOK_FLAGS]) + i + 2;
            }
            i++;
        }
    }
    function callHook(currentView, initPhase, arr, i) {
        var isInitHook = arr[i] < 0, hook = arr[i + 1], directive = currentView[isInitHook ? -arr[i] : arr[i]];
        if (isInitHook) {
            if (currentView[FLAGS] >> 10 < currentView[PREORDER_HOOK_FLAGS] >> 16 && (3 & currentView[FLAGS]) === initPhase) {
                currentView[FLAGS] += 1024;
                hook.call(directive);
            }
        } else hook.call(directive);
    }
    var elementDepthCount, stylingContext = null;
    function getCachedStylingContext() {
        return stylingContext;
    }
    function setCachedStylingContext(context) {
        stylingContext = context;
    }
    function getElementDepthCount() {
        return elementDepthCount;
    }
    function increaseElementDepthCount() {
        elementDepthCount++;
    }
    function decreaseElementDepthCount() {
        elementDepthCount--;
    }
    var bindingsEnabled, currentDirectiveDef = null;
    function getCurrentDirectiveDef() {
        return currentDirectiveDef;
    }
    function setCurrentDirectiveDef(def) {
        currentDirectiveDef = def;
    }
    function getBindingsEnabled() {
        return bindingsEnabled;
    }
    function ɵɵenableBindings() {
        bindingsEnabled = !0;
    }
    function ɵɵdisableBindings() {
        bindingsEnabled = !1;
    }
    function getLView() {
        return lView;
    }
    var previousOrParentTNode, isParent, lView, MIN_DIRECTIVE_ID = 1, activeDirectiveId = MIN_DIRECTIVE_ID, activeDirectiveSuperClassDepthPosition = 0, activeDirectiveSuperClassHeight = 0;
    function setActiveHostElement(elementIndex) {
        void 0 === elementIndex && (elementIndex = null);
        if (_selectedIndex !== elementIndex) {
            setSelectedIndex(null == elementIndex ? -1 : elementIndex);
            activeDirectiveId = null == elementIndex ? 0 : MIN_DIRECTIVE_ID;
            activeDirectiveSuperClassDepthPosition = 0;
            activeDirectiveSuperClassHeight = 0;
        }
    }
    function getActiveDirectiveId() {
        return activeDirectiveId;
    }
    function incrementActiveDirectiveId() {
        activeDirectiveId += 1 + activeDirectiveSuperClassHeight;
        activeDirectiveSuperClassDepthPosition = 0;
        activeDirectiveSuperClassHeight = 0;
    }
    function adjustActiveDirectiveSuperClassDepthPosition(delta) {
        activeDirectiveSuperClassDepthPosition += delta;
        activeDirectiveSuperClassHeight = Math.max(activeDirectiveSuperClassHeight, activeDirectiveSuperClassDepthPosition);
    }
    function getActiveDirectiveSuperClassHeight() {
        return activeDirectiveSuperClassHeight;
    }
    function getActiveDirectiveSuperClassDepth() {
        return activeDirectiveSuperClassDepthPosition;
    }
    function ɵɵrestoreView(viewToRestore) {
        contextLView = viewToRestore;
    }
    function getPreviousOrParentTNode() {
        return previousOrParentTNode;
    }
    function setPreviousOrParentTNode(tNode, _isParent) {
        previousOrParentTNode = tNode;
        isParent = _isParent;
    }
    function setTNodeAndViewData(tNode, view) {
        previousOrParentTNode = tNode;
        lView = view;
    }
    function getIsParent() {
        return isParent;
    }
    function setIsNotParent() {
        isParent = !1;
    }
    function setIsParent() {
        isParent = !0;
    }
    function isCreationMode(view) {
        void 0 === view && (view = lView);
        return 4 == (4 & view[FLAGS]);
    }
    var contextLView = null;
    function getContextLView() {
        return contextLView;
    }
    var checkNoChangesMode = !1;
    function getCheckNoChangesMode() {
        return checkNoChangesMode;
    }
    function setCheckNoChangesMode(mode) {
        checkNoChangesMode = mode;
    }
    var bindingRootIndex = -1;
    function getBindingRoot() {
        return bindingRootIndex;
    }
    function setBindingRoot(value) {
        bindingRootIndex = value;
    }
    var currentQueryIndex = 0;
    function getCurrentQueryIndex() {
        return currentQueryIndex;
    }
    function setCurrentQueryIndex(value) {
        currentQueryIndex = value;
    }
    function enterView(newView, hostTNode) {
        var oldView = lView;
        newView && (bindingRootIndex = newView[TVIEW].bindingStartIndex);
        previousOrParentTNode = hostTNode;
        isParent = !0;
        lView = contextLView = newView;
        return oldView;
    }
    function nextContextImpl(level) {
        void 0 === level && (level = 1);
        return (contextLView = walkUpViews(level, contextLView))[CONTEXT];
    }
    function walkUpViews(nestingLevel, currentView) {
        for (;nestingLevel > 0; ) {
            currentView = currentView[DECLARATION_VIEW];
            nestingLevel--;
        }
        return currentView;
    }
    function resetComponentState() {
        isParent = !1;
        previousOrParentTNode = null;
        elementDepthCount = 0;
        bindingsEnabled = !0;
    }
    function leaveView(newView) {
        var tView = lView[TVIEW];
        if (isCreationMode(lView)) lView[FLAGS] &= -5; else try {
            resetPreOrderHookFlags(lView);
            executeHooks(lView, tView.viewHooks, tView.viewCheckHooks, checkNoChangesMode, 2, void 0);
        } finally {
            lView[FLAGS] &= -73;
            lView[BINDING_INDEX] = tView.bindingStartIndex;
        }
        setCachedStylingContext(null);
        enterView(newView, null);
    }
    var _selectedIndex = -1;
    function getSelectedIndex() {
        return _selectedIndex;
    }
    function setSelectedIndex(index) {
        _selectedIndex = index;
        setCachedStylingContext(null);
    }
    var _currentNamespace = null;
    function ɵɵnamespaceSVG() {
        _currentNamespace = "http://www.w3.org/2000/svg";
    }
    function ɵɵnamespaceMathML() {
        _currentNamespace = "http://www.w3.org/1998/MathML/";
    }
    function ɵɵnamespaceHTML() {
        _currentNamespace = null;
    }
    function getNamespace() {
        return _currentNamespace;
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    var BRAND = "__SANITIZER_TRUSTED_BRAND__";
    function allowSanitizationBypass(value, type) {
        return value instanceof String && value[BRAND] === type;
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    var _devMode = !0;
    function isDevMode() {
        return _devMode;
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    var InertBodyHelper = function() {
        function InertBodyHelper(defaultDoc) {
            this.defaultDoc = defaultDoc;
            this.inertDocument = this.defaultDoc.implementation.createHTMLDocument("sanitization-inert");
            this.inertBodyElement = this.inertDocument.body;
            if (null == this.inertBodyElement) {
                var inertHtml = this.inertDocument.createElement("html");
                this.inertDocument.appendChild(inertHtml);
                this.inertBodyElement = this.inertDocument.createElement("body");
                inertHtml.appendChild(this.inertBodyElement);
            }
            this.inertBodyElement.innerHTML = '<svg><g onload="this.parentNode.remove()"></g></svg>';
            if (!this.inertBodyElement.querySelector || this.inertBodyElement.querySelector("svg")) {
                this.inertBodyElement.innerHTML = '<svg><p><style><img src="</style><img src=x onerror=alert(1)//">';
                this.getInertBodyElement = this.inertBodyElement.querySelector && this.inertBodyElement.querySelector("svg img") && isDOMParserAvailable() ? this.getInertBodyElement_DOMParser : this.getInertBodyElement_InertDocument;
            } else this.getInertBodyElement = this.getInertBodyElement_XHR;
        }
        InertBodyHelper.prototype.getInertBodyElement_XHR = function(html) {
            html = "<body><remove></remove>" + html + "</body>";
            try {
                html = encodeURI(html);
            } catch (_a) {
                return null;
            }
            var xhr = new XMLHttpRequest();
            xhr.responseType = "document";
            xhr.open("GET", "data:text/html;charset=utf-8," + html, !1);
            xhr.send(void 0);
            var body = xhr.response.body;
            body.removeChild(body.firstChild);
            return body;
        };
        InertBodyHelper.prototype.getInertBodyElement_DOMParser = function(html) {
            html = "<body><remove></remove>" + html + "</body>";
            try {
                var body = new window.DOMParser().parseFromString(html, "text/html").body;
                body.removeChild(body.firstChild);
                return body;
            } catch (_a) {
                return null;
            }
        };
        InertBodyHelper.prototype.getInertBodyElement_InertDocument = function(html) {
            var templateEl = this.inertDocument.createElement("template");
            if ("content" in templateEl) {
                templateEl.innerHTML = html;
                return templateEl;
            }
            this.inertBodyElement.innerHTML = html;
            this.defaultDoc.documentMode && this.stripCustomNsAttrs(this.inertBodyElement);
            return this.inertBodyElement;
        };
        InertBodyHelper.prototype.stripCustomNsAttrs = function(el) {
            for (var elAttrs = el.attributes, i = elAttrs.length - 1; 0 < i; i--) {
                var attrName = elAttrs.item(i).name;
                "xmlns:ns1" !== attrName && 0 !== attrName.indexOf("ns1:") || el.removeAttribute(attrName);
            }
            for (var childNode = el.firstChild; childNode; ) {
                childNode.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(childNode);
                childNode = childNode.nextSibling;
            }
        };
        return InertBodyHelper;
    }();
    function isDOMParserAvailable() {
        try {
            return !!window.DOMParser;
        } catch (_a) {
            return !1;
        }
    }
    var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:\/?#]*(?:[\/?#]|$))/gi, DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
    function _sanitizeUrl(url) {
        if ((url = String(url)).match(SAFE_URL_PATTERN) || url.match(DATA_URL_PATTERN)) return url;
        isDevMode() && console.warn("WARNING: sanitizing unsafe URL value " + url + " (see http://g.co/ng/security#xss)");
        return "unsafe:" + url;
    }
    function sanitizeSrcset(srcset) {
        return (srcset = String(srcset)).split(",").map(function(srcset) {
            return _sanitizeUrl(srcset.trim());
        }).join(", ");
    }
    function tagSet(tags) {
        for (var res = {}, _i = 0, _b = tags.split(","); _i < _b.length; _i++) res[_b[_i]] = !0;
        return res;
    }
    function merge() {
        for (var sets = [], _i = 0; _i < arguments.length; _i++) sets[_i] = arguments[_i];
        for (var res = {}, _b = 0, sets_1 = sets; _b < sets_1.length; _b++) {
            var s = sets_1[_b];
            for (var v in s) s.hasOwnProperty(v) && (res[v] = !0);
        }
        return res;
    }
    var inertBodyHelper, VOID_ELEMENTS = tagSet("area,br,col,hr,img,wbr"), OPTIONAL_END_TAG_BLOCK_ELEMENTS = tagSet("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"), OPTIONAL_END_TAG_INLINE_ELEMENTS = tagSet("rp,rt"), OPTIONAL_END_TAG_ELEMENTS = merge(OPTIONAL_END_TAG_INLINE_ELEMENTS, OPTIONAL_END_TAG_BLOCK_ELEMENTS), BLOCK_ELEMENTS = merge(OPTIONAL_END_TAG_BLOCK_ELEMENTS, tagSet("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")), INLINE_ELEMENTS = merge(OPTIONAL_END_TAG_INLINE_ELEMENTS, tagSet("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")), VALID_ELEMENTS = merge(VOID_ELEMENTS, BLOCK_ELEMENTS, INLINE_ELEMENTS, OPTIONAL_END_TAG_ELEMENTS), URI_ATTRS = tagSet("background,cite,href,itemtype,longdesc,poster,src,xlink:href"), SRCSET_ATTRS = tagSet("srcset"), HTML_ATTRS = tagSet("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"), ARIA_ATTRS = tagSet("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"), VALID_ATTRS = merge(URI_ATTRS, SRCSET_ATTRS, HTML_ATTRS, ARIA_ATTRS), SKIP_TRAVERSING_CONTENT_IF_INVALID_ELEMENTS = tagSet("script,style,template"), SanitizingHtmlSerializer = function() {
        function SanitizingHtmlSerializer() {
            this.sanitizedSomething = !1;
            this.buf = [];
        }
        SanitizingHtmlSerializer.prototype.sanitizeChildren = function(el) {
            for (var current = el.firstChild, traverseContent = !0; current; ) {
                current.nodeType === Node.ELEMENT_NODE ? traverseContent = this.startElement(current) : current.nodeType === Node.TEXT_NODE ? this.chars(current.nodeValue) : this.sanitizedSomething = !0;
                if (traverseContent && current.firstChild) current = current.firstChild; else for (;current; ) {
                    current.nodeType === Node.ELEMENT_NODE && this.endElement(current);
                    var next = this.checkClobberedElement(current, current.nextSibling);
                    if (next) {
                        current = next;
                        break;
                    }
                    current = this.checkClobberedElement(current, current.parentNode);
                }
            }
            return this.buf.join("");
        };
        SanitizingHtmlSerializer.prototype.startElement = function(element) {
            var tagName = element.nodeName.toLowerCase();
            if (!VALID_ELEMENTS.hasOwnProperty(tagName)) {
                this.sanitizedSomething = !0;
                return !SKIP_TRAVERSING_CONTENT_IF_INVALID_ELEMENTS.hasOwnProperty(tagName);
            }
            this.buf.push("<");
            this.buf.push(tagName);
            for (var elAttrs = element.attributes, i = 0; i < elAttrs.length; i++) {
                var elAttr = elAttrs.item(i), attrName = elAttr.name, lower = attrName.toLowerCase();
                if (VALID_ATTRS.hasOwnProperty(lower)) {
                    var value = elAttr.value;
                    URI_ATTRS[lower] && (value = _sanitizeUrl(value));
                    SRCSET_ATTRS[lower] && (value = sanitizeSrcset(value));
                    this.buf.push(" ", attrName, '="', encodeEntities(value), '"');
                } else this.sanitizedSomething = !0;
            }
            this.buf.push(">");
            return !0;
        };
        SanitizingHtmlSerializer.prototype.endElement = function(current) {
            var tagName = current.nodeName.toLowerCase();
            if (VALID_ELEMENTS.hasOwnProperty(tagName) && !VOID_ELEMENTS.hasOwnProperty(tagName)) {
                this.buf.push("</");
                this.buf.push(tagName);
                this.buf.push(">");
            }
        };
        SanitizingHtmlSerializer.prototype.chars = function(chars) {
            this.buf.push(encodeEntities(chars));
        };
        SanitizingHtmlSerializer.prototype.checkClobberedElement = function(node, nextNode) {
            if (nextNode && (node.compareDocumentPosition(nextNode) & Node.DOCUMENT_POSITION_CONTAINED_BY) === Node.DOCUMENT_POSITION_CONTAINED_BY) throw new Error("Failed to sanitize html because the element is clobbered: " + node.outerHTML);
            return nextNode;
        };
        return SanitizingHtmlSerializer;
    }(), SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, NON_ALPHANUMERIC_REGEXP = /([^\#-~ |!])/g;
    function encodeEntities(value) {
        return value.replace(/&/g, "&amp;").replace(SURROGATE_PAIR_REGEXP, function(match) {
            return "&#" + (1024 * (match.charCodeAt(0) - 55296) + (match.charCodeAt(1) - 56320) + 65536) + ";";
        }).replace(NON_ALPHANUMERIC_REGEXP, function(match) {
            return "&#" + match.charCodeAt(0) + ";";
        }).replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    function _sanitizeHtml(defaultDoc, unsafeHtmlInput) {
        var inertBodyElement = null;
        try {
            inertBodyHelper = inertBodyHelper || new InertBodyHelper(defaultDoc);
            var unsafeHtml = unsafeHtmlInput ? String(unsafeHtmlInput) : "";
            inertBodyElement = inertBodyHelper.getInertBodyElement(unsafeHtml);
            var mXSSAttempts = 5, parsedHtml = unsafeHtml;
            do {
                if (0 === mXSSAttempts) throw new Error("Failed to sanitize html because the input is unstable");
                mXSSAttempts--;
                unsafeHtml = parsedHtml;
                parsedHtml = inertBodyElement.innerHTML;
                inertBodyElement = inertBodyHelper.getInertBodyElement(unsafeHtml);
            } while (unsafeHtml !== parsedHtml);
            var sanitizer = new SanitizingHtmlSerializer(), safeHtml = sanitizer.sanitizeChildren(getTemplateContent(inertBodyElement) || inertBodyElement);
            isDevMode() && sanitizer.sanitizedSomething && console.warn("WARNING: sanitizing HTML stripped some content, see http://g.co/ng/security#xss");
            return safeHtml;
        } finally {
            if (inertBodyElement) for (var parent_1 = getTemplateContent(inertBodyElement) || inertBodyElement; parent_1.firstChild; ) parent_1.removeChild(parent_1.firstChild);
        }
    }
    function getTemplateContent(el) {
        return "content" in el && isTemplateElement(el) ? el.content : null;
    }
    function isTemplateElement(el) {
        return el.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === el.nodeName;
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    var SecurityContext = {
        NONE: 0,
        HTML: 1,
        STYLE: 2,
        SCRIPT: 3,
        URL: 4,
        RESOURCE_URL: 5
    };
    SecurityContext[SecurityContext.NONE] = "NONE";
    SecurityContext[SecurityContext.HTML] = "HTML";
    SecurityContext[SecurityContext.STYLE] = "STYLE";
    SecurityContext[SecurityContext.SCRIPT] = "SCRIPT";
    SecurityContext[SecurityContext.URL] = "URL";
    SecurityContext[SecurityContext.RESOURCE_URL] = "RESOURCE_URL";
    var Sanitizer = function() {
        function Sanitizer() {}
        return Sanitizer;
    }(), SAFE_STYLE_VALUE = new RegExp("^([-,.\"'%_!# a-zA-Z0-9]+|(?:(?:matrix|translate|scale|rotate|skew|perspective)(?:X|Y|3d)?|(?:rgb|hsl)a?|(?:repeating-)?(?:linear|radial)-gradient|(?:calc|attr))\\([-0-9.%, #a-zA-Z]+\\))$", "g"), URL_RE = /^url\(([^)]+)\)$/;
    function hasBalancedQuotes(value) {
        for (var outsideSingle = !0, outsideDouble = !0, i = 0; i < value.length; i++) {
            var c = value.charAt(i);
            "'" === c && outsideDouble ? outsideSingle = !outsideSingle : '"' === c && outsideSingle && (outsideDouble = !outsideDouble);
        }
        return outsideSingle && outsideDouble;
    }
    function _sanitizeStyle(value) {
        if (!(value = String(value).trim())) return "";
        var urlMatch = value.match(URL_RE);
        if (urlMatch && _sanitizeUrl(urlMatch[1]) === urlMatch[1] || value.match(SAFE_STYLE_VALUE) && hasBalancedQuotes(value)) return value;
        isDevMode() && console.warn("WARNING: sanitizing unsafe style value " + value + " (see http://g.co/ng/security#xss).");
        return "unsafe";
    }
    function ɵɵsanitizeHtml(unsafeHtml) {
        var sanitizer = getSanitizer();
        return sanitizer ? sanitizer.sanitize(SecurityContext.HTML, unsafeHtml) || "" : allowSanitizationBypass(unsafeHtml, "Html") ? unsafeHtml.toString() : _sanitizeHtml(document, renderStringify(unsafeHtml));
    }
    function ɵɵsanitizeStyle(unsafeStyle) {
        var sanitizer = getSanitizer();
        return sanitizer ? sanitizer.sanitize(SecurityContext.STYLE, unsafeStyle) || "" : allowSanitizationBypass(unsafeStyle, "Style") ? unsafeStyle.toString() : _sanitizeStyle(renderStringify(unsafeStyle));
    }
    function ɵɵsanitizeUrl(unsafeUrl) {
        var sanitizer = getSanitizer();
        return sanitizer ? sanitizer.sanitize(SecurityContext.URL, unsafeUrl) || "" : allowSanitizationBypass(unsafeUrl, "Url") ? unsafeUrl.toString() : _sanitizeUrl(renderStringify(unsafeUrl));
    }
    function ɵɵsanitizeResourceUrl(unsafeResourceUrl) {
        var sanitizer = getSanitizer();
        if (sanitizer) return sanitizer.sanitize(SecurityContext.RESOURCE_URL, unsafeResourceUrl) || "";
        if (allowSanitizationBypass(unsafeResourceUrl, "ResourceUrl")) return unsafeResourceUrl.toString();
        throw new Error("unsafe value used in a resource URL context (see http://g.co/ng/security#xss)");
    }
    function ɵɵsanitizeScript(unsafeScript) {
        var sanitizer = getSanitizer();
        if (sanitizer) return sanitizer.sanitize(SecurityContext.SCRIPT, unsafeScript) || "";
        if (allowSanitizationBypass(unsafeScript, "Script")) return unsafeScript.toString();
        throw new Error("unsafe value used in a script context");
    }
    function getUrlSanitizer(tag, prop) {
        return "src" === prop && ("embed" === tag || "frame" === tag || "iframe" === tag || "media" === tag || "script" === tag) || "href" === prop && ("base" === tag || "link" === tag) ? ɵɵsanitizeResourceUrl : ɵɵsanitizeUrl;
    }
    function ɵɵsanitizeUrlOrResourceUrl(unsafeUrl, tag, prop) {
        return getUrlSanitizer(tag, prop)(unsafeUrl);
    }
    var ɵɵdefaultStyleSanitizer = function(prop, value, mode) {
        var doSanitizeValue = !0;
        1 & (mode = mode || 3) && (doSanitizeValue = "background-image" === prop || "background" === prop || "border-image" === prop || "filter" === prop || "list-style" === prop || "list-style-image" === prop || "clip-path" === prop);
        return 2 & mode ? doSanitizeValue ? ɵɵsanitizeStyle(value) : value : doSanitizeValue;
    };
    function getSanitizer() {
        var lView = getLView();
        return lView && lView[SANITIZER];
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    var TNODE = 8, PARENT_INJECTOR = 8, INJECTOR_BLOOM_PARENT_SIZE = 9, NO_PARENT_INJECTOR = -1, NodeInjectorFactory = function() {
        function NodeInjectorFactory(factory, isViewProvider, injectImplementation) {
            this.factory = factory;
            this.resolving = !1;
            this.canSeeViewProviders = isViewProvider;
            this.injectImpl = injectImplementation;
        }
        return NodeInjectorFactory;
    }();
    function isFactory(obj) {
        return null !== obj && "object" == typeof obj && Object.getPrototypeOf(obj) == NodeInjectorFactory.prototype;
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var RendererStyleFlags3 = {
        Important: 1,
        DashCase: 2
    };
    RendererStyleFlags3[RendererStyleFlags3.Important] = "Important";
    RendererStyleFlags3[RendererStyleFlags3.DashCase] = "DashCase";
    function isProceduralRenderer(renderer) {
        return !!renderer.listen;
    }
    var domRendererFactory3 = {
        createRenderer: function(hostElement, rendererType) {
            return document;
        }
    };
    function attachPatchData(target, data) {
        target[MONKEY_PATCH_KEY_NAME] = data;
    }
    var CorePlayerHandler = function() {
        function CorePlayerHandler() {
            this._players = [];
        }
        CorePlayerHandler.prototype.flushPlayers = function() {
            for (var i = 0; i < this._players.length; i++) {
                var player = this._players[i];
                player.parent || 0 !== player.state || player.play();
            }
            this._players.length = 0;
        };
        CorePlayerHandler.prototype.queuePlayer = function(player) {
            this._players.push(player);
        };
        return CorePlayerHandler;
    }(), DEFAULT_TEMPLATE_DIRECTIVE_INDEX = 0, ANIMATION_PROP_PREFIX = "@";
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    function createEmptyStylingContext(wrappedElement, sanitizer, initialStyles, initialClasses) {
        var context = [ wrappedElement || null, 0, [], initialStyles || [ null, null ], initialClasses || [ null, null ], [ 0, 0 ], [ 0 ], [ 0 ], null, null ];
        allocateOrUpdateDirectiveIntoContext(context, DEFAULT_TEMPLATE_DIRECTIVE_INDEX);
        return context;
    }
    function allocateOrUpdateDirectiveIntoContext(context, directiveIndex, singlePropValuesIndex, styleSanitizer) {
        void 0 === singlePropValuesIndex && (singlePropValuesIndex = -1);
        for (var directiveRegistry = context[2], index = 2 * directiveIndex, limit = index + 2, i = directiveRegistry.length; i < limit; i += 2) directiveRegistry.push(-1, null);
        var propValuesStartPosition = index + 0;
        if (singlePropValuesIndex >= 0 && -1 === directiveRegistry[propValuesStartPosition]) {
            directiveRegistry[propValuesStartPosition] = singlePropValuesIndex;
            directiveRegistry[index + 1] = styleSanitizer || null;
        }
    }
    function allocStylingContext(element, templateStyleContext) {
        for (var context = templateStyleContext.slice(), i = 0; i < 10; i++) {
            var value = templateStyleContext[i];
            Array.isArray(value) && (context[i] = value.slice());
        }
        context[0] = element;
        context[1] |= 16;
        return context;
    }
    function getStylingContextFromLView(index, viewData) {
        for (var storageIndex = index, slotValue = viewData[storageIndex], wrapper = viewData; Array.isArray(slotValue); ) {
            wrapper = slotValue;
            slotValue = slotValue[HOST];
        }
        if (isStylingContext(wrapper)) return wrapper;
        var stylingTemplate = getTNode(index - HEADER_OFFSET, viewData).stylingTemplate;
        wrapper !== viewData && (storageIndex = HOST);
        return wrapper[storageIndex] = stylingTemplate ? allocStylingContext(slotValue, stylingTemplate) : createEmptyStylingContext(slotValue);
    }
    function isAnimationProp(name) {
        return name[0] === ANIMATION_PROP_PREFIX;
    }
    function hasClassInput(tNode) {
        return 0 != (8 & tNode.flags);
    }
    function hasStyleInput(tNode) {
        return 0 != (16 & tNode.flags);
    }
    function forceClassesAsString(classes) {
        classes && "string" != typeof classes && (classes = Object.keys(classes).join(" "));
        return classes || "";
    }
    function forceStylesAsString(styles) {
        var str = "";
        if (styles) for (var props = Object.keys(styles), i = 0; i < props.length; i++) {
            var prop = props[i];
            str += (i ? ";" : "") + prop + ":" + styles[prop];
        }
        return str;
    }
    function addPlayerInternal(playerContext, rootContext, element, player, playerContextIndex, ref) {
        ref = ref || element;
        playerContextIndex ? playerContext[playerContextIndex] = player : playerContext.push(player);
        if (player) {
            player.addEventListener(200, function() {
                var index = playerContext.indexOf(player);
                index && (index < playerContext[0] ? playerContext[index] = null : playerContext.splice(index, 1));
                player.destroy();
            });
            (rootContext.playerHandler || (rootContext.playerHandler = new CorePlayerHandler())).queuePlayer(player, ref);
            return !0;
        }
        return !1;
    }
    function getPlayerContext(stylingContext) {
        return stylingContext[9];
    }
    function allocPlayerContext(data) {
        return data[9] = [ 5, null, null, null, null ];
    }
    function setUpAttributes(native, attrs) {
        for (var renderer = getLView()[RENDERER], isProc = isProceduralRenderer(renderer), i = 0; i < attrs.length; ) {
            var value = attrs[i];
            if ("number" == typeof value) {
                if (0 !== value) break;
                i++;
                var namespaceURI = attrs[i++], attrName = attrs[i++], attrVal = attrs[i++];
                isProc ? renderer.setAttribute(native, attrName, attrVal, namespaceURI) : native.setAttributeNS(namespaceURI, attrName, attrVal);
            } else {
                attrVal = attrs[++i];
                isAnimationProp(attrName = value) ? isProc && renderer.setProperty(native, attrName, attrVal) : isProc ? renderer.setAttribute(native, attrName, attrVal) : native.setAttribute(attrName, attrVal);
                i++;
            }
        }
        return i;
    }
    function attrsStylingIndexOf(attrs, startIndex) {
        for (var i = startIndex; i < attrs.length; i++) {
            var val = attrs[i];
            if (1 === val || 2 === val) return i;
        }
        return -1;
    }
    function isNameOnlyAttributeMarker(marker) {
        return 3 === marker || 4 === marker || 6 === marker;
    }
    function hasParentInjector(parentLocation) {
        return parentLocation !== NO_PARENT_INJECTOR;
    }
    function getParentInjectorIndex(parentLocation) {
        return 32767 & parentLocation;
    }
    function getParentInjectorViewOffset(parentLocation) {
        return parentLocation >> 16;
    }
    function getParentInjectorView(location, startView) {
        for (var viewOffset = getParentInjectorViewOffset(location), parentView = startView; viewOffset > 0; ) {
            parentView = parentView[DECLARATION_VIEW];
            viewOffset--;
        }
        return parentView;
    }
    function getLViewParent(lView) {
        var parent = lView[PARENT];
        return isLContainer(parent) ? parent[PARENT] : parent;
    }
    function getRootView(componentOrLView) {
        for (var lView = isLView(componentOrLView) ? componentOrLView : readPatchedLView(componentOrLView); lView && !(512 & lView[FLAGS]); ) lView = getLViewParent(lView);
        return lView;
    }
    function findComponentView(lView) {
        for (var rootTNode = lView[T_HOST]; null !== rootTNode && 2 === rootTNode.type; ) rootTNode = (lView = lView[DECLARATION_VIEW])[T_HOST];
        return lView;
    }
    function getRootContext(viewOrComponent) {
        return getRootView(viewOrComponent)[CONTEXT];
    }
    var includeViewProviders = !0;
    function setIncludeViewProviders(v) {
        var oldValue = includeViewProviders;
        includeViewProviders = v;
        return oldValue;
    }
    var BLOOM_MASK = 255, nextNgElementId = 0;
    function bloomAdd(injectorIndex, tView, type) {
        var id = "string" != typeof type ? type[NG_ELEMENT_ID] : type.charCodeAt(0) || 0;
        null == id && (id = type[NG_ELEMENT_ID] = nextNgElementId++);
        var bloomBit = id & BLOOM_MASK, mask = 1 << bloomBit, b6 = 64 & bloomBit, b5 = 32 & bloomBit, tData = tView.data;
        128 & bloomBit ? b6 ? b5 ? tData[injectorIndex + 7] |= mask : tData[injectorIndex + 6] |= mask : b5 ? tData[injectorIndex + 5] |= mask : tData[injectorIndex + 4] |= mask : b6 ? b5 ? tData[injectorIndex + 3] |= mask : tData[injectorIndex + 2] |= mask : b5 ? tData[injectorIndex + 1] |= mask : tData[injectorIndex] |= mask;
    }
    function getOrCreateNodeInjectorForNode(tNode, hostView) {
        var existingInjectorIndex = getInjectorIndex(tNode, hostView);
        if (-1 !== existingInjectorIndex) return existingInjectorIndex;
        var tView = hostView[TVIEW];
        if (tView.firstTemplatePass) {
            tNode.injectorIndex = hostView.length;
            insertBloom(tView.data, tNode);
            insertBloom(hostView, null);
            insertBloom(tView.blueprint, null);
        }
        var parentLoc = getParentInjectorLocation(tNode, hostView), parentIndex = getParentInjectorIndex(parentLoc), parentLView = getParentInjectorView(parentLoc, hostView), injectorIndex = tNode.injectorIndex;
        if (hasParentInjector(parentLoc)) for (var parentData = parentLView[TVIEW].data, i = 0; i < 8; i++) hostView[injectorIndex + i] = parentLView[parentIndex + i] | parentData[parentIndex + i];
        hostView[injectorIndex + PARENT_INJECTOR] = parentLoc;
        return injectorIndex;
    }
    function insertBloom(arr, footer) {
        arr.push(0, 0, 0, 0, 0, 0, 0, 0, footer);
    }
    function getInjectorIndex(tNode, hostView) {
        return -1 === tNode.injectorIndex || tNode.parent && tNode.parent.injectorIndex === tNode.injectorIndex || null == hostView[tNode.injectorIndex + PARENT_INJECTOR] ? -1 : tNode.injectorIndex;
    }
    function getParentInjectorLocation(tNode, view) {
        if (tNode.parent && -1 !== tNode.parent.injectorIndex) return tNode.parent.injectorIndex;
        for (var hostTNode = view[T_HOST], viewOffset = 1; hostTNode && -1 === hostTNode.injectorIndex; ) {
            hostTNode = (view = view[DECLARATION_VIEW]) ? view[T_HOST] : null;
            viewOffset++;
        }
        return hostTNode ? hostTNode.injectorIndex | viewOffset << 16 : -1;
    }
    function diPublicInInjector(injectorIndex, view, token) {
        bloomAdd(injectorIndex, view[TVIEW], token);
    }
    function injectAttributeImpl(tNode, attrNameToInject) {
        var attrs = tNode.attrs;
        if (attrs) for (var attrsLength = attrs.length, i = 0; i < attrsLength; ) {
            var value = attrs[i];
            if (isNameOnlyAttributeMarker(value)) break;
            if (0 === value) i += 2; else if ("number" == typeof value) {
                i++;
                if (1 === value && "class" === attrNameToInject) {
                    for (var accumulatedClasses = ""; i < attrsLength && "string" == typeof attrs[i]; ) accumulatedClasses += " " + attrs[i++];
                    return accumulatedClasses.trim();
                }
                if (2 === value && "style" === attrNameToInject) {
                    for (var accumulatedStyles = ""; i < attrsLength && "string" == typeof attrs[i]; ) accumulatedStyles += attrs[i++] + ": " + attrs[i++] + "; ";
                    return accumulatedStyles.trim();
                }
                for (;i < attrsLength && "string" == typeof attrs[i]; ) i++;
            } else {
                if (value === attrNameToInject) return attrs[i + 1];
                i += 2;
            }
        }
        return null;
    }
    function getOrCreateInjectable(tNode, lView, token, flags, notFoundValue) {
        void 0 === flags && (flags = InjectFlags.Default);
        if (tNode) {
            var bloomHash = bloomHashBitOrFactory(token);
            if ("function" == typeof bloomHash) {
                var savePreviousOrParentTNode = getPreviousOrParentTNode(), saveLView = getLView();
                setTNodeAndViewData(tNode, lView);
                try {
                    var value = bloomHash();
                    if (null != value || flags & InjectFlags.Optional) return value;
                    throw new Error("No provider for " + stringifyForError(token) + "!");
                } finally {
                    setTNodeAndViewData(savePreviousOrParentTNode, saveLView);
                }
            } else if ("number" == typeof bloomHash) {
                if (-1 === bloomHash) return new NodeInjector(tNode, lView);
                var previousTView = null, injectorIndex = getInjectorIndex(tNode, lView), parentLocation = NO_PARENT_INJECTOR, hostTElementNode = flags & InjectFlags.Host ? findComponentView(lView)[T_HOST] : null;
                if (-1 === injectorIndex || flags & InjectFlags.SkipSelf) {
                    parentLocation = -1 === injectorIndex ? getParentInjectorLocation(tNode, lView) : lView[injectorIndex + PARENT_INJECTOR];
                    if (shouldSearchParent(flags, !1)) {
                        previousTView = lView[TVIEW];
                        injectorIndex = getParentInjectorIndex(parentLocation);
                        lView = getParentInjectorView(parentLocation, lView);
                    } else injectorIndex = -1;
                }
                for (;-1 !== injectorIndex; ) {
                    parentLocation = lView[injectorIndex + PARENT_INJECTOR];
                    var tView = lView[TVIEW];
                    if (bloomHasToken(bloomHash, injectorIndex, tView.data)) {
                        var instance = searchTokensOnInjector(injectorIndex, lView, token, previousTView, flags, hostTElementNode);
                        if (instance !== NOT_FOUND) return instance;
                    }
                    if (shouldSearchParent(flags, lView[TVIEW].data[injectorIndex + TNODE] === hostTElementNode) && bloomHasToken(bloomHash, injectorIndex, lView)) {
                        previousTView = tView;
                        injectorIndex = getParentInjectorIndex(parentLocation);
                        lView = getParentInjectorView(parentLocation, lView);
                    } else injectorIndex = -1;
                }
            }
        }
        flags & InjectFlags.Optional && void 0 === notFoundValue && (notFoundValue = null);
        if (0 == (flags & (InjectFlags.Self | InjectFlags.Host))) {
            var moduleInjector = lView[INJECTOR$1], previousInjectImplementation = setInjectImplementation(void 0);
            try {
                return moduleInjector ? moduleInjector.get(token, notFoundValue, flags & InjectFlags.Optional) : injectRootLimpMode(token, notFoundValue, flags & InjectFlags.Optional);
            } finally {
                setInjectImplementation(previousInjectImplementation);
            }
        }
        if (flags & InjectFlags.Optional) return notFoundValue;
        throw new Error("NodeInjector: NOT_FOUND [" + stringifyForError(token) + "]");
    }
    var NOT_FOUND = {};
    function searchTokensOnInjector(injectorIndex, lView, token, previousTView, flags, hostTElementNode) {
        var currentTView = lView[TVIEW], tNode = currentTView.data[injectorIndex + TNODE], injectableIdx = locateDirectiveOrProvider(tNode, lView, token, null == previousTView ? isComponent(tNode) && includeViewProviders : previousTView != currentTView && 3 === tNode.type, flags & InjectFlags.Host && hostTElementNode === tNode);
        return null !== injectableIdx ? getNodeInjectable(currentTView.data, lView, injectableIdx, tNode) : NOT_FOUND;
    }
    function locateDirectiveOrProvider(tNode, lView, token, canAccessViewProviders, isHostSpecialCase) {
        for (var nodeProviderIndexes = tNode.providerIndexes, tInjectables = lView[TVIEW].data, injectablesStart = 65535 & nodeProviderIndexes, directivesStart = tNode.directiveStart, cptViewProvidersCount = nodeProviderIndexes >> 16, endIndex = isHostSpecialCase ? injectablesStart + cptViewProvidersCount : tNode.directiveEnd, i = canAccessViewProviders ? injectablesStart : injectablesStart + cptViewProvidersCount; i < endIndex; i++) {
            var providerTokenOrDef = tInjectables[i];
            if (i < directivesStart && token === providerTokenOrDef || i >= directivesStart && providerTokenOrDef.type === token) return i;
        }
        if (isHostSpecialCase) {
            var dirDef = tInjectables[directivesStart];
            if (dirDef && isComponentDef(dirDef) && dirDef.type === token) return directivesStart;
        }
        return null;
    }
    function getNodeInjectable(tData, lData, index, tNode) {
        var value = lData[index];
        if (isFactory(value)) {
            var factory = value;
            if (factory.resolving) throw new Error("Circular dep for " + stringifyForError(tData[index]));
            var previousIncludeViewProviders = setIncludeViewProviders(factory.canSeeViewProviders);
            factory.resolving = !0;
            var previousInjectImplementation = void 0;
            factory.injectImpl && (previousInjectImplementation = setInjectImplementation(factory.injectImpl));
            var savePreviousOrParentTNode = getPreviousOrParentTNode(), saveLView = getLView();
            setTNodeAndViewData(tNode, lData);
            try {
                value = lData[index] = factory.factory(null, tData, lData, tNode);
            } finally {
                factory.injectImpl && setInjectImplementation(previousInjectImplementation);
                setIncludeViewProviders(previousIncludeViewProviders);
                factory.resolving = !1;
                setTNodeAndViewData(savePreviousOrParentTNode, saveLView);
            }
        }
        return value;
    }
    function bloomHashBitOrFactory(token) {
        if ("string" == typeof token) return token.charCodeAt(0) || 0;
        var tokenId = token[NG_ELEMENT_ID];
        return "number" == typeof tokenId && tokenId > 0 ? tokenId & BLOOM_MASK : tokenId;
    }
    function bloomHasToken(bloomHash, injectorIndex, injectorView) {
        var b6 = 64 & bloomHash, b5 = 32 & bloomHash;
        return !!((128 & bloomHash ? b6 ? b5 ? injectorView[injectorIndex + 7] : injectorView[injectorIndex + 6] : b5 ? injectorView[injectorIndex + 5] : injectorView[injectorIndex + 4] : b6 ? b5 ? injectorView[injectorIndex + 3] : injectorView[injectorIndex + 2] : b5 ? injectorView[injectorIndex + 1] : injectorView[injectorIndex]) & 1 << bloomHash);
    }
    function shouldSearchParent(flags, isFirstHostTNode) {
        return !(flags & InjectFlags.Self || flags & InjectFlags.Host && isFirstHostTNode);
    }
    var NodeInjector = function() {
        function NodeInjector(_tNode, _lView) {
            this._tNode = _tNode;
            this._lView = _lView;
        }
        NodeInjector.prototype.get = function(token, notFoundValue) {
            return getOrCreateInjectable(this._tNode, this._lView, token, void 0, notFoundValue);
        };
        return NodeInjector;
    }();
    function ɵɵgetFactoryOf(type) {
        var typeAny = type, def = getComponentDef(typeAny) || getDirectiveDef(typeAny) || getPipeDef(typeAny) || getInjectableDef(typeAny) || getInjectorDef(typeAny);
        return def && void 0 !== def.factory ? def.factory : null;
    }
    function ɵɵgetInheritedFactory(type) {
        var factory = ɵɵgetFactoryOf(Object.getPrototypeOf(type.prototype).constructor);
        return null !== factory ? factory : function(t) {
            return new t();
        };
    }
    function getDebugContext(error) {
        return error[ERROR_DEBUG_CONTEXT];
    }
    function getOriginalError(error) {
        return error[ERROR_ORIGINAL_ERROR];
    }
    function getErrorLogger(error) {
        return error[ERROR_LOGGER] || defaultErrorLogger;
    }
    function defaultErrorLogger(console) {
        for (var values = [], _i = 1; _i < arguments.length; _i++) values[_i - 1] = arguments[_i];
        console.error.apply(console, values);
    }
    var ErrorHandler = function() {
        function ErrorHandler() {
            this._console = console;
        }
        ErrorHandler.prototype.handleError = function(error) {
            var originalError = this._findOriginalError(error), context = this._findContext(error), errorLogger = getErrorLogger(error);
            errorLogger(this._console, "ERROR", error);
            originalError && errorLogger(this._console, "ORIGINAL ERROR", originalError);
            context && errorLogger(this._console, "ERROR CONTEXT", context);
        };
        ErrorHandler.prototype._findContext = function(error) {
            return error ? getDebugContext(error) ? getDebugContext(error) : this._findContext(getOriginalError(error)) : null;
        };
        ErrorHandler.prototype._findOriginalError = function(error) {
            for (var e = getOriginalError(error); e && getOriginalError(e); ) e = getOriginalError(e);
            return e;
        };
        return ErrorHandler;
    }(), NO_CHANGE = {};
    function registerHostDirective(context, directiveIndex) {
        var buffer = context[8];
        buffer || (buffer = context[8] = [ DEFAULT_TEMPLATE_DIRECTIVE_INDEX ]);
        buffer[0] = directiveIndex;
    }
    function enqueueHostInstruction(context, priority, instructionFn, instructionFnArgs) {
        var buffer = context[8];
        if (null != buffer) {
            var index = findNextInsertionIndex(buffer, priority);
            buffer.splice(index, 0, priority, instructionFn, instructionFnArgs);
        }
    }
    function findNextInsertionIndex(buffer, priority) {
        for (var i = 1; i < buffer.length; i += 3) if (buffer[i + 0] > priority) return i;
        return buffer.length;
    }
    function flushQueue(context) {
        var buffer = context[8];
        if (buffer) {
            for (var i = 1; i < buffer.length; i += 3) buffer[i + 1].apply(this, buffer[i + 2]);
            buffer.length = 1;
        }
    }
    function allowFlush(context, directiveIndex) {
        var buffer = context[8];
        return !buffer || buffer[0] === directiveIndex;
    }
    var BoundPlayerFactory = function() {
        function BoundPlayerFactory(fn, value) {
            this.fn = fn;
            this.value = value;
        }
        return BoundPlayerFactory;
    }();
    function initializeStaticContext(attrs, stylingStartIndex, directiveIndex) {
        void 0 === directiveIndex && (directiveIndex = 0);
        var context = createEmptyStylingContext();
        patchContextWithStaticAttrs(context, attrs, stylingStartIndex, directiveIndex);
        return context;
    }
    function patchContextWithStaticAttrs(context, attrs, attrsStylingStartIndex, directiveIndex) {
        if (!(16 & context[1])) {
            allocateOrUpdateDirectiveIntoContext(context, directiveIndex);
            for (var initialClasses = null, initialStyles = null, mode = -1, i = attrsStylingStartIndex; i < attrs.length; i++) {
                var attr = attrs[i];
                "number" == typeof attr ? mode = attr : 1 == mode ? patchInitialStylingValue(initialClasses = initialClasses || context[4], attr, !0, directiveIndex) : 2 == mode && patchInitialStylingValue(initialStyles = initialStyles || context[3], attr, attrs[++i], directiveIndex);
            }
        }
    }
    function patchInitialStylingValue(initialStyling, prop, value, directiveOwnerIndex) {
        for (var i = 2; i < initialStyling.length; i += 3) if (initialStyling[i + 0] === prop) {
            allowValueChange(initialStyling[i + 1], value, initialStyling[i + 2], directiveOwnerIndex) && addOrUpdateStaticStyle(i, initialStyling, prop, value, directiveOwnerIndex);
            return;
        }
        addOrUpdateStaticStyle(null, initialStyling, prop, value, directiveOwnerIndex);
    }
    function renderInitialClasses(element, context, renderer, startIndex) {
        for (var initialClasses = context[4], i = startIndex || 2; i < initialClasses.length; ) {
            initialClasses[i + 1] && setClass(element, initialClasses[i + 0], !0, renderer, null);
            i += 3;
        }
        return i;
    }
    function renderInitialStyles(element, context, renderer, startIndex) {
        for (var initialStyles = context[3], i = startIndex || 2; i < initialStyles.length; ) {
            var value = initialStyles[i + 1];
            value && setStyle(element, initialStyles[i + 0], value, renderer, null);
            i += 3;
        }
        return i;
    }
    function updateContextWithBindings(context, directiveIndex, classBindingNames, styleBindingNames, styleSanitizer) {
        if (!(16 & context[1]) && findOrPatchDirectiveIntoRegistry(context, directiveIndex, !1, styleSanitizer)) {
            styleBindingNames && (styleBindingNames = hyphenateEntries(styleBindingNames));
            var singlePropOffsetValues = context[5], totalCurrentClassBindings = singlePropOffsetValues[1], totalCurrentStyleBindings = singlePropOffsetValues[0], cachedClassMapValues = context[6], cachedStyleMapValues = context[7], stylesOffset = 4 * totalCurrentStyleBindings, singleStylesStartIndex = 10, singleClassesStartIndex = singleStylesStartIndex + stylesOffset, multiStylesStartIndex = singleClassesStartIndex + 4 * totalCurrentClassBindings, multiClassesStartIndex = multiStylesStartIndex + stylesOffset, currentSinglePropsLength = singlePropOffsetValues.length;
            singlePropOffsetValues.push(styleBindingNames ? styleBindingNames.length : 0, classBindingNames ? classBindingNames.length : 0);
            var insertionOffset = 0, filteredStyleBindingNames = [];
            if (styleBindingNames && styleBindingNames.length) for (var i_1 = 0; i_1 < styleBindingNames.length; i_1++) {
                var name_1 = styleBindingNames[i_1];
                if (-1 == (singlePropIndex = getMatchingBindingIndex(context, name_1, singleStylesStartIndex, singleClassesStartIndex))) {
                    singlePropIndex = singleClassesStartIndex + insertionOffset;
                    insertionOffset += 4;
                    filteredStyleBindingNames.push(name_1);
                }
                singlePropOffsetValues.push(singlePropIndex);
            }
            var filteredClassBindingNames = [];
            if (classBindingNames && classBindingNames.length) for (var i_2 = 0; i_2 < classBindingNames.length; i_2++) {
                var singlePropIndex, name_2 = classBindingNames[i_2];
                if (-1 == (singlePropIndex = getMatchingBindingIndex(context, name_2, singleClassesStartIndex, multiStylesStartIndex))) {
                    singlePropIndex = multiStylesStartIndex + insertionOffset;
                    insertionOffset += 4;
                    filteredClassBindingNames.push(name_2);
                } else singlePropIndex += 4 * filteredStyleBindingNames.length;
                singlePropOffsetValues.push(singlePropIndex);
            }
            var i = 2;
            if (filteredStyleBindingNames.length) for (;i < currentSinglePropsLength; ) {
                var totalStyles = singlePropOffsetValues[i + 0], totalClasses = singlePropOffsetValues[i + 1];
                if (totalClasses) for (var start = i + 2 + totalStyles, j = start; j < start + totalClasses; j++) singlePropOffsetValues[j] += 4 * filteredStyleBindingNames.length;
                i += 2 + (totalStyles + totalClasses);
            }
            for (var totalNewEntries = filteredClassBindingNames.length + filteredStyleBindingNames.length, i_3 = singleStylesStartIndex; i_3 < context.length; i_3 += 4) {
                var isMultiBased = i_3 >= multiStylesStartIndex, isClassBased = i_3 >= (isMultiBased ? multiClassesStartIndex : singleClassesStartIndex), flag = getPointers(context, i_3), staticIndex = getInitialIndex(flag), singleOrMultiIndex = getMultiOrSingleIndex(flag);
                setFlag(context, i_3, pointers(flag, staticIndex, singleOrMultiIndex += isMultiBased ? isClassBased ? 4 * filteredStyleBindingNames.length : 0 : 4 * totalNewEntries + 4 * (isClassBased ? filteredStyleBindingNames.length : 0)));
            }
            for (var i_4 = 0; i_4 < 4 * filteredStyleBindingNames.length; i_4++) {
                context.splice(multiClassesStartIndex, 0, null);
                context.splice(singleClassesStartIndex, 0, null);
                singleClassesStartIndex++;
                multiStylesStartIndex++;
                multiClassesStartIndex += 2;
            }
            for (var i_5 = 0; i_5 < 4 * filteredClassBindingNames.length; i_5++) {
                context.splice(multiStylesStartIndex, 0, null);
                context.push(null);
                multiStylesStartIndex++;
                multiClassesStartIndex++;
            }
            for (var initialClasses = context[4], initialStyles = context[3], i_6 = 0; i_6 < totalNewEntries; i_6++) {
                var entryIsClassBased = i_6 >= filteredStyleBindingNames.length, adjustedIndex = entryIsClassBased ? i_6 - filteredStyleBindingNames.length : i_6, propName = entryIsClassBased ? filteredClassBindingNames[adjustedIndex] : filteredStyleBindingNames[adjustedIndex], multiIndex = void 0, singleIndex = void 0;
                if (entryIsClassBased) {
                    multiIndex = multiClassesStartIndex + 4 * (totalCurrentClassBindings + adjustedIndex);
                    singleIndex = singleClassesStartIndex + 4 * (totalCurrentClassBindings + adjustedIndex);
                } else {
                    multiIndex = multiStylesStartIndex + 4 * (totalCurrentStyleBindings + adjustedIndex);
                    singleIndex = singleStylesStartIndex + 4 * (totalCurrentStyleBindings + adjustedIndex);
                }
                var initialValuesToLookup = entryIsClassBased ? initialClasses : initialStyles, indexForInitial = getInitialStylingValuesIndexOf(initialValuesToLookup, propName);
                -1 === indexForInitial ? indexForInitial = addOrUpdateStaticStyle(null, initialValuesToLookup, propName, !entryIsClassBased && null, directiveIndex) + 1 : indexForInitial += 1;
                var initialFlag = prepareInitialFlag(context, propName, entryIsClassBased, styleSanitizer || null);
                setFlag(context, singleIndex, pointers(initialFlag, indexForInitial, multiIndex));
                setProp(context, singleIndex, propName);
                setValue(context, singleIndex, null);
                setPlayerBuilderIndex(context, singleIndex, 0, directiveIndex);
                setFlag(context, multiIndex, pointers(initialFlag, indexForInitial, singleIndex));
                setProp(context, multiIndex, propName);
                setValue(context, multiIndex, null);
                setPlayerBuilderIndex(context, multiIndex, 0, directiveIndex);
            }
            singlePropOffsetValues[1] = totalCurrentClassBindings + filteredClassBindingNames.length;
            singlePropOffsetValues[0] = totalCurrentStyleBindings + filteredStyleBindingNames.length;
            cachedClassMapValues[0] += filteredClassBindingNames.length;
            cachedStyleMapValues[0] += filteredStyleBindingNames.length;
            var newStylesSpaceAllocationSize = 4 * filteredStyleBindingNames.length, newClassesSpaceAllocationSize = 4 * filteredClassBindingNames.length, cachedStyleMapIndex = cachedStyleMapValues.length;
            registerMultiMapEntry(context, directiveIndex, !1, multiStylesStartIndex + 4 * totalCurrentStyleBindings, filteredStyleBindingNames.length);
            for (var i_7 = 1; i_7 < cachedStyleMapIndex; i_7 += 4) cachedStyleMapValues[i_7 + 1] += newClassesSpaceAllocationSize + newStylesSpaceAllocationSize;
            var cachedClassMapIndex = cachedClassMapValues.length;
            registerMultiMapEntry(context, directiveIndex, !0, multiClassesStartIndex + 4 * totalCurrentClassBindings, filteredClassBindingNames.length);
            for (var i_8 = 1; i_8 < cachedClassMapIndex; i_8 += 4) cachedClassMapValues[i_8 + 1] += 2 * newStylesSpaceAllocationSize + newClassesSpaceAllocationSize;
            setFlag(context, 1, pointers(0, 0, multiStylesStartIndex));
        }
    }
    function findOrPatchDirectiveIntoRegistry(context, directiveIndex, staticModeOnly, styleSanitizer) {
        var directiveRegistry = context[2], index = 2 * directiveIndex;
        if (index < directiveRegistry.length && directiveRegistry[index + 0] >= 0) return !1;
        allocateOrUpdateDirectiveIntoContext(context, directiveIndex, staticModeOnly ? -1 : context[5].length, styleSanitizer);
        return !0;
    }
    function getMatchingBindingIndex(context, bindingName, start, end) {
        for (var j = start; j < end; j += 4) if (getProp(context, j) === bindingName) return j;
        return -1;
    }
    function updateClassMap(context, classesInput, directiveIndex) {
        void 0 === directiveIndex && (directiveIndex = 0);
        updateStylingMap(context, classesInput, !0, directiveIndex);
    }
    function updateStyleMap(context, stylesInput, directiveIndex) {
        void 0 === directiveIndex && (directiveIndex = 0);
        updateStylingMap(context, stylesInput, !1, directiveIndex);
    }
    function updateStylingMap(context, input, entryIsClassBased, directiveIndex) {
        void 0 === directiveIndex && (directiveIndex = 0);
        if (!isMultiValueCacheHit(context, entryIsClassBased, directiveIndex, input)) {
            var startIndex, endIndex, propNames, playerBuilder = (input = input === NO_CHANGE ? readCachedMapValue(context, entryIsClassBased, directiveIndex) : input) instanceof BoundPlayerFactory ? new ClassAndStylePlayerBuilder(input, context[0], entryIsClassBased ? 1 : 2) : null, rawValue = playerBuilder ? input.value : input, playerBuilderPosition = entryIsClassBased ? 1 : 3, playerBuilderIndex = playerBuilder ? playerBuilderPosition : 0, playerBuildersAreDirty = !1;
            if (hasPlayerBuilderChanged(context, playerBuilder, playerBuilderPosition)) {
                setPlayerBuilder(context, playerBuilder, playerBuilderPosition);
                playerBuildersAreDirty = !0;
            }
            var applyAll = !1;
            if (entryIsClassBased) {
                if ("string" == typeof rawValue) {
                    propNames = rawValue.split(/\s+/);
                    applyAll = !0;
                } else propNames = rawValue ? Object.keys(rawValue) : EMPTY_ARRAY$1;
                startIndex = getMultiClassesStartIndex(context);
                endIndex = context.length;
            } else {
                startIndex = getMultiStylesStartIndex(context);
                endIndex = getMultiClassesStartIndex(context);
                propNames = rawValue ? Object.keys(rawValue) : EMPTY_ARRAY$1;
            }
            patchStylingMapIntoContext(context, directiveIndex, playerBuilderIndex, startIndex, endIndex, propNames, applyAll || rawValue || EMPTY_OBJ, input, entryIsClassBased);
            playerBuildersAreDirty && setContextPlayersDirty(context, !0);
        }
    }
    function patchStylingMapIntoContext(context, directiveIndex, playerBuilderIndex, ctxStart, ctxEnd, props, values, cacheValue, entryIsClassBased) {
        for (var dirty = !1, cacheIndex = 1 + 4 * directiveIndex, cachedValues = context[entryIsClassBased ? 6 : 7], ownershipValuesStartIndex = cachedValues[cacheIndex + 1], existingCachedValueCount = cachedValues[cacheIndex + 3], valuesEntryShapeChange = 1 === cachedValues[cacheIndex + 0] || !(cachedValues[cacheIndex + 2] || !cacheValue), totalUniqueValues = 0, totalNewAllocatedSlots = 0, applyAllProps = !0 === values, ctxIndex = ctxStart, totalRemainingProperties = props.length; ctxIndex < ownershipValuesStartIndex; ) {
            var currentProp = getProp(context, ctxIndex);
            if (totalRemainingProperties) for (var i = 0; i < props.length; i++) if ((normalizedProp = (mapProp = props[i]) ? entryIsClassBased ? mapProp : hyphenate(mapProp) : null) && currentProp === normalizedProp) {
                var currentValue = getValue(context, ctxIndex), currentDirectiveIndex = getDirectiveIndexFromEntry(context, ctxIndex), value = !!applyAllProps || values[normalizedProp], currentFlag = getPointers(context, ctxIndex);
                if (hasValueChanged(currentFlag, currentValue, value) && allowValueChange(currentValue, value, currentDirectiveIndex, directiveIndex)) {
                    setValue(context, ctxIndex, value);
                    setPlayerBuilderIndex(context, ctxIndex, playerBuilderIndex, directiveIndex);
                    if (hasInitialValueChanged(context, currentFlag, value)) {
                        setDirty(context, ctxIndex, !0);
                        dirty = !0;
                    }
                }
                props[i] = null;
                totalRemainingProperties--;
                break;
            }
            ctxIndex += 4;
        }
        if (totalRemainingProperties) {
            var sanitizer = entryIsClassBased ? null : getStyleSanitizer(context, directiveIndex);
            propertiesLoop: for (i = 0; i < props.length; i++) {
                var mapProp;
                if (mapProp = props[i]) {
                    value = !!applyAllProps || values[mapProp];
                    for (var normalizedProp = entryIsClassBased ? mapProp : hyphenate(mapProp), isInsideOwnershipArea = ctxIndex >= ownershipValuesStartIndex, j = ctxIndex; j < ctxEnd; j += 4) if (getProp(context, j) === normalizedProp) {
                        var distantCtxDirectiveIndex = getDirectiveIndexFromEntry(context, j), distantCtxPlayerBuilderIndex = getPlayerBuilderIndex(context, j), distantCtxValue = getValue(context, j), distantCtxFlag = getPointers(context, j);
                        if (allowValueChange(distantCtxValue, value, distantCtxDirectiveIndex, directiveIndex)) {
                            if (isInsideOwnershipArea) {
                                swapMultiContextEntries(context, ctxIndex, j);
                                totalUniqueValues++;
                            }
                            if (hasValueChanged(distantCtxFlag, distantCtxValue, value)) {
                                (null === value || void 0 === value && value !== distantCtxValue) && (valuesEntryShapeChange = !0);
                                setValue(context, ctxIndex, value);
                                if (null !== distantCtxValue || hasInitialValueChanged(context, distantCtxFlag, value)) {
                                    setDirty(context, ctxIndex, !0);
                                    dirty = !0;
                                }
                            }
                            distantCtxDirectiveIndex === directiveIndex && playerBuilderIndex === distantCtxPlayerBuilderIndex || setPlayerBuilderIndex(context, ctxIndex, playerBuilderIndex, directiveIndex);
                        }
                        ctxIndex += 4;
                        continue propertiesLoop;
                    }
                    if (null != value) {
                        valuesEntryShapeChange = !0;
                        totalUniqueValues++;
                        insertNewMultiProperty(context, isInsideOwnershipArea ? ctxIndex : ownershipValuesStartIndex + 4 * totalNewAllocatedSlots, entryIsClassBased, normalizedProp, 1 | prepareInitialFlag(context, normalizedProp, entryIsClassBased, sanitizer), value, directiveIndex, playerBuilderIndex);
                        totalNewAllocatedSlots++;
                        ctxEnd += 4;
                        ctxIndex += 4;
                        dirty = !0;
                    }
                }
            }
        }
        for (;ctxIndex < ctxEnd; ) {
            valuesEntryShapeChange = !0;
            var ctxValue = getValue(context, ctxIndex), ctxFlag = getPointers(context, ctxIndex);
            getDirectiveIndexFromEntry(context, ctxIndex);
            null != ctxValue && (valuesEntryShapeChange = !0);
            if (hasValueChanged(ctxFlag, ctxValue, null)) {
                setValue(context, ctxIndex, null);
                if (hasInitialValueChanged(context, ctxFlag, ctxValue)) {
                    setDirty(context, ctxIndex, !0);
                    dirty = !0;
                }
                setPlayerBuilderIndex(context, ctxIndex, playerBuilderIndex, directiveIndex);
            }
            ctxIndex += 4;
        }
        updateCachedMapValue(context, directiveIndex, entryIsClassBased, cacheValue, ownershipValuesStartIndex, ctxEnd, totalUniqueValues, valuesEntryShapeChange = valuesEntryShapeChange || existingCachedValueCount !== totalUniqueValues);
        dirty && setContextDirty(context, !0);
        return totalNewAllocatedSlots;
    }
    function updateClassProp(context, offset, input, directiveIndex, forceOverride) {
        void 0 === directiveIndex && (directiveIndex = 0);
        updateSingleStylingValue(context, offset, input, !0, directiveIndex, forceOverride);
    }
    function updateStyleProp(context, offset, input, directiveIndex, forceOverride) {
        void 0 === directiveIndex && (directiveIndex = 0);
        updateSingleStylingValue(context, offset, input, !1, directiveIndex, forceOverride);
    }
    function updateSingleStylingValue(context, offset, input, isClassBased, directiveIndex, forceOverride) {
        var singleIndex = getSinglePropIndexValue(context, directiveIndex, offset, isClassBased), currValue = getValue(context, singleIndex), currFlag = getPointers(context, singleIndex), currDirective = getDirectiveIndexFromEntry(context, singleIndex), value = input instanceof BoundPlayerFactory ? input.value : input;
        if (hasValueChanged(currFlag, currValue, value) && (forceOverride || allowValueChange(currValue, value, currDirective, directiveIndex))) {
            var isClassBased_1 = 2 == (2 & currFlag), playerBuilder = input instanceof BoundPlayerFactory ? new ClassAndStylePlayerBuilder(input, context[0], isClassBased_1 ? 1 : 2) : null, value_1 = playerBuilder ? input.value : input, currPlayerIndex = getPlayerBuilderIndex(context, singleIndex), playerBuildersAreDirty = !1, playerBuilderIndex = playerBuilder ? currPlayerIndex : 0;
            if (hasPlayerBuilderChanged(context, playerBuilder, currPlayerIndex)) {
                var newIndex = setPlayerBuilder(context, playerBuilder, currPlayerIndex);
                playerBuilderIndex = playerBuilder ? newIndex : 0;
                playerBuildersAreDirty = !0;
            }
            (playerBuildersAreDirty || currDirective !== directiveIndex) && setPlayerBuilderIndex(context, singleIndex, playerBuilderIndex, directiveIndex);
            if (currDirective !== directiveIndex) {
                var prop = getProp(context, singleIndex), sanitizer = getStyleSanitizer(context, directiveIndex);
                setSanitizeFlag(context, singleIndex, !(!sanitizer || !sanitizer(prop, null, 1)));
            }
            setValue(context, singleIndex, value_1);
            var indexForMulti = getMultiOrSingleIndex(currFlag), valueForMulti = getValue(context, indexForMulti);
            if (!valueForMulti || hasValueChanged(currFlag, valueForMulti, value_1)) {
                var multiDirty = !1, singleDirty = !0;
                if (!valueExists(value_1, isClassBased_1) && valueExists(valueForMulti, isClassBased_1)) {
                    multiDirty = !0;
                    singleDirty = !1;
                }
                setDirty(context, indexForMulti, multiDirty);
                setDirty(context, singleIndex, singleDirty);
                setContextDirty(context, !0);
            }
            playerBuildersAreDirty && setContextPlayersDirty(context, !0);
        }
    }
    function renderStyling(context, renderer, rootOrView, isFirstRender, classesStore, stylesStore, directiveIndex) {
        void 0 === directiveIndex && (directiveIndex = 0);
        var totalPlayersQueued = 0;
        if (allowFlush(context, directiveIndex)) {
            flushQueue(context);
            if (isContextDirty(context)) {
                for (var native = context[0], flushPlayerBuilders = 8 & context[1], multiStartIndex = getMultiStylesStartIndex(context), i = 10; i < context.length; i += 4) if (isDirty(context, i)) {
                    var flag = getPointers(context, i), directiveIndex_1 = getDirectiveIndexFromEntry(context, i), prop = getProp(context, i), value = getValue(context, i), styleSanitizer_1 = 4 & flag ? getStyleSanitizer(context, directiveIndex_1) : null, playerBuilder = getPlayerBuilder(context, i), isClassBased = !!(2 & flag), valueToApply = value;
                    i < multiStartIndex && !valueExists(valueToApply, isClassBased) && (valueToApply = getValue(context, getMultiOrSingleIndex(flag)));
                    valueExists(valueToApply, isClassBased) || (valueToApply = getInitialValue(context, flag));
                    renderer && (!isFirstRender || valueToApply) && (isClassBased ? setClass(native, prop, !!valueToApply, renderer, classesStore, playerBuilder) : setStyle(native, prop, valueToApply, renderer, styleSanitizer_1, stylesStore, playerBuilder));
                    setDirty(context, i, !1);
                }
                if (flushPlayerBuilders) {
                    var rootContext = Array.isArray(rootOrView) ? getRootContext(rootOrView) : rootOrView, playerContext = getPlayerContext(context), playersStartIndex = playerContext[0];
                    for (i = 1; i < playersStartIndex; i += 2) {
                        var builder = playerContext[i], playerInsertionIndex = i + 1, oldPlayer = playerContext[playerInsertionIndex];
                        if (builder) {
                            var player = builder.buildPlayer(oldPlayer, isFirstRender);
                            if (void 0 !== player) {
                                null != player && addPlayerInternal(playerContext, rootContext, native, player, playerInsertionIndex) && totalPlayersQueued++;
                                oldPlayer && oldPlayer.destroy();
                            }
                        } else oldPlayer && oldPlayer.destroy();
                    }
                    setContextPlayersDirty(context, !1);
                }
                setContextDirty(context, !1);
            }
        }
        return totalPlayersQueued;
    }
    function setStyle(native, prop, value, renderer, sanitizer, store, playerBuilder) {
        value = sanitizer && value ? sanitizer(prop, value, 3) : value;
        if (store || playerBuilder) {
            store && store.setValue(prop, value);
            playerBuilder && playerBuilder.setValue(prop, value);
        } else if (value) {
            value = value.toString();
            isProceduralRenderer(renderer) ? renderer.setStyle(native, prop, value, RendererStyleFlags3.DashCase) : native.style.setProperty(prop, value);
        } else isProceduralRenderer(renderer) ? renderer.removeStyle(native, prop, RendererStyleFlags3.DashCase) : native.style.removeProperty(prop);
    }
    function setClass(native, className, add, renderer, store, playerBuilder) {
        if (store || playerBuilder) {
            store && store.setValue(className, add);
            playerBuilder && playerBuilder.setValue(className, add);
        } else "" !== className && (add ? isProceduralRenderer(renderer) ? renderer.addClass(native, className) : native.classList.add(className) : isProceduralRenderer(renderer) ? renderer.removeClass(native, className) : native.classList.remove(className));
    }
    function setSanitizeFlag(context, index, sanitizeYes) {
        sanitizeYes ? context[index] |= 4 : context[index] &= -5;
    }
    function setDirty(context, index, isDirtyYes) {
        var adjustedIndex = index >= 10 ? index + 0 : index;
        isDirtyYes ? context[adjustedIndex] |= 1 : context[adjustedIndex] &= -2;
    }
    function isDirty(context, index) {
        return 1 == (1 & context[index >= 10 ? index + 0 : index]);
    }
    function isClassBasedValue(context, index) {
        return 2 == (2 & context[index >= 10 ? index + 0 : index]);
    }
    function isSanitizable(context, index) {
        return 4 == (4 & context[index >= 10 ? index + 0 : index]);
    }
    function pointers(configFlag, staticIndex, dynamicIndex) {
        return 31 & configFlag | staticIndex << 5 | dynamicIndex << 19;
    }
    function getInitialValue(context, flag) {
        var index = getInitialIndex(flag);
        return (2 & flag ? context[4] : context[3])[index];
    }
    function getInitialIndex(flag) {
        return flag >> 5 & 16383;
    }
    function getMultiOrSingleIndex(flag) {
        var index = flag >> 19 & 16383;
        return index >= 10 ? index : -1;
    }
    function getMultiClassesStartIndex(context) {
        return context[6][2];
    }
    function getMultiStylesStartIndex(context) {
        return context[7][2];
    }
    function setProp(context, index, prop) {
        context[index + 1] = prop;
    }
    function setValue(context, index, value) {
        context[index + 2] = value;
    }
    function hasPlayerBuilderChanged(context, builder, index) {
        var playerContext = context[9];
        if (builder) {
            if (!playerContext || 0 === index) return !0;
        } else if (!playerContext) return !1;
        return playerContext[index] !== builder;
    }
    function setPlayerBuilder(context, builder, insertionIndex) {
        var playerContext = context[9] || allocPlayerContext(context);
        if (insertionIndex > 0) playerContext[insertionIndex] = builder; else {
            playerContext.splice(insertionIndex = playerContext[0], 0, builder, null);
            playerContext[0] += 2;
        }
        return insertionIndex;
    }
    function directiveOwnerPointers(directiveIndex, playerIndex) {
        return playerIndex << 16 | directiveIndex;
    }
    function setPlayerBuilderIndex(context, index, playerBuilderIndex, directiveIndex) {
        var value = directiveOwnerPointers(directiveIndex, playerBuilderIndex);
        context[index + 3] = value;
    }
    function getPlayerBuilderIndex(context, index) {
        return context[index + 3] >> 16 & 65535;
    }
    function getPlayerBuilder(context, index) {
        var playerBuilderIndex = getPlayerBuilderIndex(context, index);
        if (playerBuilderIndex) {
            var playerContext = context[9];
            if (playerContext) return playerContext[playerBuilderIndex];
        }
        return null;
    }
    function setFlag(context, index, flag) {
        context[1 === index ? index : index + 0] = flag;
    }
    function getPointers(context, index) {
        return context[1 === index ? index : index + 0];
    }
    function getValue(context, index) {
        return context[index + 2];
    }
    function getProp(context, index) {
        return context[index + 1];
    }
    function isContextDirty(context) {
        return isDirty(context, 1);
    }
    function setContextDirty(context, isDirtyYes) {
        setDirty(context, 1, isDirtyYes);
    }
    function setContextPlayersDirty(context, isDirtyYes) {
        isDirtyYes ? context[1] |= 8 : context[1] &= -9;
    }
    function swapMultiContextEntries(context, indexA, indexB) {
        if (indexA !== indexB) {
            var tmpValue = getValue(context, indexA), tmpProp = getProp(context, indexA), tmpFlag = getPointers(context, indexA), tmpPlayerBuilderIndex = getPlayerBuilderIndex(context, indexA), tmpDirectiveIndex = getDirectiveIndexFromEntry(context, indexA), flagA = tmpFlag, flagB = getPointers(context, indexB), singleIndexA = getMultiOrSingleIndex(flagA);
            singleIndexA >= 0 && setFlag(context, singleIndexA, pointers(_flag = getPointers(context, singleIndexA), getInitialIndex(_flag), indexB));
            var singleIndexB = getMultiOrSingleIndex(flagB);
            if (singleIndexB >= 0) {
                var _flag;
                setFlag(context, singleIndexB, pointers(_flag = getPointers(context, singleIndexB), getInitialIndex(_flag), indexA));
            }
            setValue(context, indexA, getValue(context, indexB));
            setProp(context, indexA, getProp(context, indexB));
            setFlag(context, indexA, getPointers(context, indexB));
            setPlayerBuilderIndex(context, indexA, getPlayerBuilderIndex(context, indexB), getDirectiveIndexFromEntry(context, indexB));
            setValue(context, indexB, tmpValue);
            setProp(context, indexB, tmpProp);
            setFlag(context, indexB, tmpFlag);
            setPlayerBuilderIndex(context, indexB, tmpPlayerBuilderIndex, tmpDirectiveIndex);
        }
    }
    function updateSinglePointerValues(context, indexStartPosition) {
        for (var i = indexStartPosition; i < context.length; i += 4) {
            var singleIndex = getMultiOrSingleIndex(getPointers(context, i));
            if (singleIndex > 0) {
                var initialIndexForSingle = getInitialIndex(getPointers(context, singleIndex));
                setFlag(context, singleIndex, pointers((isDirty(context, singleIndex) ? 1 : 0) | (isClassBasedValue(context, singleIndex) ? 2 : 0) | (isSanitizable(context, singleIndex) ? 4 : 0), initialIndexForSingle, i));
            }
        }
    }
    function insertNewMultiProperty(context, index, classBased, name, flag, value, directiveIndex, playerIndex) {
        var doShift = index < context.length;
        context.splice(index, 0, 1 | flag | (classBased ? 2 : 0), name, value, 0);
        setPlayerBuilderIndex(context, index, playerIndex, directiveIndex);
        doShift && updateSinglePointerValues(context, index + 4);
    }
    function valueExists(value, isClassBased) {
        return null !== value;
    }
    function prepareInitialFlag(context, prop, entryIsClassBased, sanitizer) {
        var initialIndex, flag = sanitizer && sanitizer(prop, null, 1) ? 4 : 0;
        if (entryIsClassBased) {
            flag |= 2;
            initialIndex = getInitialStylingValuesIndexOf(context[4], prop);
        } else initialIndex = getInitialStylingValuesIndexOf(context[3], prop);
        return pointers(flag, initialIndex = initialIndex > 0 ? initialIndex + 1 : 0, 0);
    }
    function hasInitialValueChanged(context, flag, newValue) {
        var initialValue = getInitialValue(context, flag);
        return !initialValue || hasValueChanged(flag, initialValue, newValue);
    }
    function hasValueChanged(flag, a, b) {
        return !(2 & flag) && a && b && 4 & flag ? a.toString() !== b.toString() : a !== b;
    }
    var ClassAndStylePlayerBuilder = function() {
        function ClassAndStylePlayerBuilder(factory, _element, _type) {
            this._element = _element;
            this._type = _type;
            this._values = {};
            this._dirty = !1;
            this._factory = factory;
        }
        ClassAndStylePlayerBuilder.prototype.setValue = function(prop, value) {
            if (this._values[prop] !== value) {
                this._values[prop] = value;
                this._dirty = !0;
            }
        };
        ClassAndStylePlayerBuilder.prototype.buildPlayer = function(currentPlayer, isFirstRender) {
            if (this._dirty) {
                var player = this._factory.fn(this._element, this._type, this._values, isFirstRender, currentPlayer || null);
                this._values = {};
                this._dirty = !1;
                return player;
            }
        };
        return ClassAndStylePlayerBuilder;
    }();
    function getDirectiveIndexFromEntry(context, index) {
        return 65535 & context[index + 3];
    }
    function getInitialStylingValuesIndexOf(keyValues, key) {
        for (var i = 2; i < keyValues.length; i += 3) if (keyValues[i] === key) return i;
        return -1;
    }
    function getSinglePropIndexValue(context, directiveIndex, offset, isClassBased) {
        var singlePropOffsetRegistryIndex = context[2][2 * directiveIndex + 0], offsets = context[5];
        return offsets[singlePropOffsetRegistryIndex + 2 + (isClassBased ? offsets[singlePropOffsetRegistryIndex + 0] : 0) + offset];
    }
    function getStyleSanitizer(context, directiveIndex) {
        var dirs = context[2];
        return dirs[2 * directiveIndex + 1] || dirs[1] || null;
    }
    function allowValueChange(currentValue, newValue, currentDirectiveOwner, newDirectiveOwner) {
        return null == currentValue || (null != newValue ? newDirectiveOwner <= currentDirectiveOwner : currentDirectiveOwner === newDirectiveOwner);
    }
    function getInitialClassNameValue(context) {
        var initialClassValues = context[4], className = initialClassValues[1];
        if (null === className) {
            className = "";
            for (var i = 2; i < initialClassValues.length; i += 3) initialClassValues[i + 1] && (className += (className.length ? " " : "") + initialClassValues[i]);
            initialClassValues[1] = className;
        }
        return className;
    }
    function getInitialStyleStringValue(context) {
        var initialStyleValues = context[3], styleString = initialStyleValues[1];
        if (null === styleString) {
            styleString = "";
            for (var i = 2; i < initialStyleValues.length; i += 3) {
                var value = initialStyleValues[i + 1];
                null !== value && (styleString += (styleString.length ? ";" : "") + initialStyleValues[i] + ":" + value);
            }
            initialStyleValues[1] = styleString;
        }
        return styleString;
    }
    function readCachedMapValue(context, entryIsClassBased, directiveIndex) {
        return context[entryIsClassBased ? 6 : 7][1 + 4 * directiveIndex + 2] || null;
    }
    function isMultiValueCacheHit(context, entryIsClassBased, directiveIndex, newValue) {
        return !context[entryIsClassBased ? 6 : 7][1 + 4 * directiveIndex + 0] && (newValue === NO_CHANGE || readCachedMapValue(context, entryIsClassBased, directiveIndex) === newValue);
    }
    function updateCachedMapValue(context, directiveIndex, entryIsClassBased, cacheValue, startPosition, endPosition, totalValues, dirtyFutureValues) {
        var values = context[entryIsClassBased ? 6 : 7], index = 1 + 4 * directiveIndex;
        if (dirtyFutureValues) for (var nextStartPosition = startPosition + 4 * totalValues, i = index + 4; i < values.length; i += 4) {
            values[i + 1] = nextStartPosition;
            values[i + 0] = 1;
        }
        values[index + 0] = 0;
        values[index + 1] = startPosition;
        values[index + 2] = cacheValue;
        values[index + 3] = totalValues;
        var totalStylingEntries = totalValues;
        for (i = 1; i < index; i += 4) totalStylingEntries += values[i + 3];
        if (!entryIsClassBased) {
            var classCache = context[6], diffInStartPosition = endPosition - classCache[2];
            for (i = 1; i < classCache.length; i += 4) classCache[i + 1] += diffInStartPosition;
        }
        values[0] = totalStylingEntries;
    }
    function hyphenateEntries(entries) {
        for (var newEntries = [], i = 0; i < entries.length; i++) newEntries.push(hyphenate(entries[i]));
        return newEntries;
    }
    function hyphenate(value) {
        return value.replace(/[a-z][A-Z]/g, function(match) {
            return match.charAt(0) + "-" + match.charAt(1).toLowerCase();
        });
    }
    function registerMultiMapEntry(context, directiveIndex, entryIsClassBased, startPosition, count) {
        void 0 === count && (count = 0);
        var cachedValues = context[entryIsClassBased ? 6 : 7];
        if (directiveIndex > 0) for (var limit = 1 + 4 * directiveIndex; cachedValues.length < limit; ) cachedValues.push(0, startPosition, null, 0);
        cachedValues.push(0, startPosition, null, count);
    }
    function addOrUpdateStaticStyle(index, staticStyles, prop, value, directiveOwnerIndex) {
        if (null === index) {
            index = staticStyles.length;
            staticStyles.push(null, null, null);
            staticStyles[index + 0] = prop;
        }
        staticStyles[index + 1] = value;
        staticStyles[index + 2] = directiveOwnerIndex;
        return index;
    }
    var NG_TEMPLATE_SELECTOR = "ng-template";
    function isCssClassMatching(nodeClassAttrVal, cssClassToMatch) {
        var nodeClassesLen = nodeClassAttrVal.length, matchIndex = nodeClassAttrVal.indexOf(cssClassToMatch), matchEndIdx = matchIndex + cssClassToMatch.length;
        return !(-1 === matchIndex || matchIndex > 0 && " " !== nodeClassAttrVal[matchIndex - 1] || matchEndIdx < nodeClassesLen && " " !== nodeClassAttrVal[matchEndIdx]);
    }
    function hasTagAndTypeMatch(tNode, currentSelector, isProjectionMode) {
        return currentSelector === (0 !== tNode.type || isProjectionMode ? tNode.tagName : NG_TEMPLATE_SELECTOR);
    }
    function isNodeMatchingSelector(tNode, selector, isProjectionMode) {
        for (var mode = 4, nodeAttrs = tNode.attrs || [], nameOnlyMarkerIdx = getNameOnlyMarkerIndex(nodeAttrs), skipToNextSelector = !1, i = 0; i < selector.length; i++) {
            var current = selector[i];
            if ("number" != typeof current) {
                if (!skipToNextSelector) if (4 & mode) {
                    mode = 2 | 1 & mode;
                    if ("" !== current && !hasTagAndTypeMatch(tNode, current, isProjectionMode) || "" === current && 1 === selector.length) {
                        if (isPositive(mode)) return !1;
                        skipToNextSelector = !0;
                    }
                } else {
                    var selectorAttrValue = 8 & mode ? current : selector[++i];
                    if (8 & mode && tNode.stylingTemplate) {
                        if (!isCssClassMatching(readClassValueFromTNode(tNode), selectorAttrValue)) {
                            if (isPositive(mode)) return !1;
                            skipToNextSelector = !0;
                        }
                        continue;
                    }
                    var attrIndexInNode = findAttrIndexInNode(8 & mode ? "class" : current, nodeAttrs, 0 == tNode.type && tNode.tagName !== NG_TEMPLATE_SELECTOR, isProjectionMode);
                    if (-1 === attrIndexInNode) {
                        if (isPositive(mode)) return !1;
                        skipToNextSelector = !0;
                        continue;
                    }
                    if ("" !== selectorAttrValue) {
                        var nodeAttrValue = void 0;
                        nodeAttrValue = attrIndexInNode > nameOnlyMarkerIdx ? "" : nodeAttrs[attrIndexInNode + 1];
                        var compareAgainstClassName = 8 & mode ? nodeAttrValue : null;
                        if (compareAgainstClassName && !isCssClassMatching(compareAgainstClassName, selectorAttrValue) || 2 & mode && selectorAttrValue !== nodeAttrValue) {
                            if (isPositive(mode)) return !1;
                            skipToNextSelector = !0;
                        }
                    }
                }
            } else {
                if (!skipToNextSelector && !isPositive(mode) && !isPositive(current)) return !1;
                if (skipToNextSelector && isPositive(current)) continue;
                skipToNextSelector = !1;
                mode = current | 1 & mode;
            }
        }
        return isPositive(mode) || skipToNextSelector;
    }
    function isPositive(mode) {
        return 0 == (1 & mode);
    }
    function readClassValueFromTNode(tNode) {
        return tNode.stylingTemplate ? getInitialClassNameValue(tNode.stylingTemplate) : "";
    }
    function findAttrIndexInNode(name, attrs, isInlineTemplate, isProjectionMode) {
        if (null === attrs) return -1;
        var i = 0;
        if (isProjectionMode || !isInlineTemplate) {
            for (var bindingsMode = !1; i < attrs.length; ) {
                var maybeAttrName = attrs[i];
                if (maybeAttrName === name) return i;
                if (3 === maybeAttrName || 6 === maybeAttrName) bindingsMode = !0; else {
                    if (1 === maybeAttrName) {
                        for (var value = attrs[++i]; "string" == typeof value; ) value = attrs[++i];
                        continue;
                    }
                    if (4 === maybeAttrName) break;
                    if (0 === maybeAttrName) {
                        i += 4;
                        continue;
                    }
                }
                i += bindingsMode ? 1 : 2;
            }
            return -1;
        }
        return matchTemplateAttribute(attrs, name);
    }
    function isNodeMatchingSelectorList(tNode, selector, isProjectionMode) {
        void 0 === isProjectionMode && (isProjectionMode = !1);
        for (var i = 0; i < selector.length; i++) if (isNodeMatchingSelector(tNode, selector[i], isProjectionMode)) return !0;
        return !1;
    }
    function getProjectAsAttrValue(tNode) {
        var nodeAttrs = tNode.attrs;
        if (null != nodeAttrs) {
            var ngProjectAsAttrIdx = nodeAttrs.indexOf(5);
            if (0 == (1 & ngProjectAsAttrIdx)) return nodeAttrs[ngProjectAsAttrIdx + 1];
        }
        return null;
    }
    function getNameOnlyMarkerIndex(nodeAttrs) {
        for (var i = 0; i < nodeAttrs.length; i++) if (isNameOnlyAttributeMarker(nodeAttrs[i])) return i;
        return nodeAttrs.length;
    }
    function matchTemplateAttribute(attrs, name) {
        var i = attrs.indexOf(4);
        if (i > -1) {
            i++;
            for (;i < attrs.length; ) {
                if (attrs[i] === name) return i;
                i++;
            }
        }
        return -1;
    }
    function isSelectorInSelectorList(selector, list) {
        selectorListLoop: for (var i = 0; i < list.length; i++) {
            var currentSelectorInList = list[i];
            if (selector.length === currentSelectorInList.length) {
                for (var j = 0; j < selector.length; j++) if (selector[j] !== currentSelectorInList[j]) continue selectorListLoop;
                return !0;
            }
        }
        return !1;
    }
    var _currentSanitizer, ELEMENT_MARKER = {
        marker: "element"
    }, COMMENT_MARKER = {
        marker: "comment"
    }, _stylingMode = 0;
    function runtimeIsNewStylingInUse() {
        return _stylingMode > 0;
    }
    function runtimeAllowOldStyling() {
        return _stylingMode < 2;
    }
    function setCurrentStyleSanitizer(sanitizer) {
        _currentSanitizer = sanitizer;
    }
    function getCurrentStyleSanitizer() {
        return _currentSanitizer;
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     * @param {?} obj
     * @param {?} debug
     * @return {?}
     */    var MAP_BASED_ENTRY_PROP_NAME = "--MAP--";
    function allocTStylingContext() {
        return [ 0, 0, 1, 0, MAP_BASED_ENTRY_PROP_NAME ];
    }
    function getBindingNameFromIndex(stylingContext, offset, directiveIndex, isClassBased) {
        return getProp(stylingContext, getSinglePropIndexValue(stylingContext, directiveIndex, offset, isClassBased));
    }
    function updateContextDirectiveIndex(context, index) {
        context[1] = index;
    }
    function getConfig(context) {
        return context[0];
    }
    function setConfig(context, value) {
        context[0] = value;
    }
    function getProp$1(context, index) {
        return context[index + 2];
    }
    function getPropConfig(context, index) {
        return 1 & context[index + 0];
    }
    function isSanitizationRequired(context, index) {
        return (1 & getPropConfig(context, index)) > 0;
    }
    function getGuardMask(context, index) {
        return context[index + 0] >> 1;
    }
    function setGuardMask(context, index, maskValue) {
        var config = getPropConfig(context, index);
        context[index + 0] = config | maskValue << 1;
    }
    function getValuesCount(context, index) {
        return context[index + 1];
    }
    function getBindingValue(context, index, offset) {
        return context[index + 3 + offset];
    }
    function getDefaultValue(context, index) {
        return context[index + 3 + getValuesCount(context, index) - 1];
    }
    function allowStylingFlush(context, index) {
        return index === context[1];
    }
    function lockContext(context) {
        setConfig(context, 1 | getConfig(context));
    }
    function isContextLocked(context) {
        return (1 & getConfig(context)) > 0;
    }
    function getPropValuesStartPosition(context) {
        return 5 + context[3];
    }
    function hasValueChanged$1(a, b) {
        return (Array.isArray(a) ? a[0] : a) !== (Array.isArray(b) ? b[0] : b);
    }
    function isStylingValueDefined(value) {
        return null != value && "" !== value;
    }
    function getCurrentOrLViewSanitizer(lView) {
        var sanitizer = getCurrentStyleSanitizer() || lView[SANITIZER];
        if (sanitizer && "function" != typeof sanitizer) {
            setCurrentStyleSanitizer(sanitizer);
            return sanitizeUsingSanitizerObject;
        }
        return sanitizer;
    }
    var sanitizeUsingSanitizerObject = function(prop, value, mode) {
        var sanitizer = getCurrentStyleSanitizer();
        return sanitizer ? !(2 & mode) || sanitizer.sanitize(SecurityContext.STYLE, value) : value;
    }, DEFAULT_BINDING_VALUE = null, DEFAULT_SIZE_VALUE = 1, DEFAULT_GUARD_MASK_VALUE = 1, STYLING_INDEX_FOR_MAP_BINDING = 0, STYLING_INDEX_START_VALUE = 1, currentStyleIndex = STYLING_INDEX_START_VALUE, currentClassIndex = STYLING_INDEX_START_VALUE, stylesBitMask = 0, classesBitMask = 0, deferredBindingQueue = [];
    function updateClassBinding(context, data, prop, bindingIndex, value, deferRegistration, forceUpdate) {
        var index = prop ? currentClassIndex++ : STYLING_INDEX_FOR_MAP_BINDING;
        (updateBindingData(context, data, index, prop, bindingIndex, value, deferRegistration, forceUpdate, !1) || forceUpdate) && (classesBitMask |= 1 << index);
    }
    function updateStyleBinding(context, data, prop, bindingIndex, value, sanitizer, deferRegistration, forceUpdate) {
        var isMapBased = !prop, index = isMapBased ? STYLING_INDEX_FOR_MAP_BINDING : currentStyleIndex++;
        (updateBindingData(context, data, index, prop, bindingIndex, value, deferRegistration, forceUpdate, !!isMapBased || !!sanitizer && sanitizer(prop, null, 1)) || forceUpdate) && (stylesBitMask |= 1 << index);
    }
    function updateBindingData(context, data, counterIndex, prop, bindingIndex, value, deferRegistration, forceUpdate, sanitizationRequired) {
        if (!isContextLocked(context)) if (deferRegistration) deferBindingRegistration(context, counterIndex, prop, bindingIndex, sanitizationRequired); else {
            deferredBindingQueue.length && flushDeferredBindings();
            registerBinding(context, counterIndex, prop, bindingIndex, sanitizationRequired);
        }
        var changed = forceUpdate || hasValueChanged$1(data[bindingIndex], value);
        changed && (data[bindingIndex] = value);
        return changed;
    }
    function deferBindingRegistration(context, counterIndex, prop, bindingIndex, sanitizationRequired) {
        deferredBindingQueue.unshift(context, counterIndex, prop, bindingIndex, sanitizationRequired);
    }
    function flushDeferredBindings() {
        for (var i = 0; i < deferredBindingQueue.length; ) registerBinding(deferredBindingQueue[i++], deferredBindingQueue[i++], deferredBindingQueue[i++], deferredBindingQueue[i++], deferredBindingQueue[i++]);
        deferredBindingQueue.length = 0;
    }
    function registerBinding(context, countId, prop, bindingValue, sanitizationRequired) {
        if (prop) {
            for (var found = !1, i = getPropValuesStartPosition(context); i < context.length; ) {
                var valuesCount = getValuesCount(context, i), p = getProp$1(context, i);
                if (found = prop <= p) {
                    prop < p && allocateNewContextEntry(context, i, prop, sanitizationRequired);
                    addBindingIntoContext(context, !1, i, bindingValue, countId);
                    break;
                }
                i += 3 + valuesCount;
            }
            if (!found) {
                allocateNewContextEntry(context, context.length, prop, sanitizationRequired);
                addBindingIntoContext(context, !1, i, bindingValue, countId);
            }
        } else addBindingIntoContext(context, !0, 2, bindingValue, countId);
    }
    function allocateNewContextEntry(context, index, prop, sanitizationRequired) {
        context.splice(index, 0, sanitizationRequired ? 1 : 0, DEFAULT_SIZE_VALUE, prop, DEFAULT_BINDING_VALUE);
        setGuardMask(context, index, DEFAULT_GUARD_MASK_VALUE);
    }
    function addBindingIntoContext(context, isMapBased, index, bindingValue, countId) {
        var lastValueIndex = index + 3 + getValuesCount(context, index);
        isMapBased || lastValueIndex--;
        if ("number" == typeof bindingValue) {
            context.splice(lastValueIndex, 0, bindingValue);
            context[index + 1]++;
            setGuardMask(context, index, getGuardMask(context, index) | 1 << countId);
        } else "string" == typeof bindingValue && null == context[lastValueIndex] && (context[lastValueIndex] = bindingValue);
    }
    function applyClasses(renderer, data, context, element, directiveIndex) {
        var classesFlushed = !1;
        if (allowStylingFlush(context, directiveIndex)) {
            !isContextLocked(context) && lockContext(context);
            if (classesBitMask) {
                applyStyling(context, renderer, element, data, classesBitMask, setClass$1, null);
                classesBitMask = 0;
                classesFlushed = !0;
            }
            currentClassIndex = STYLING_INDEX_START_VALUE;
        }
        return classesFlushed;
    }
    function applyStyles(renderer, data, context, element, directiveIndex, sanitizer) {
        var stylesFlushed = !1;
        if (allowStylingFlush(context, directiveIndex)) {
            !isContextLocked(context) && lockContext(context);
            if (stylesBitMask) {
                applyStyling(context, renderer, element, data, stylesBitMask, setStyle$1, sanitizer);
                stylesBitMask = 0;
                stylesFlushed = !0;
            }
            currentStyleIndex = STYLING_INDEX_START_VALUE;
            return !0;
        }
        return stylesFlushed;
    }
    function applyStyling(context, renderer, element, bindingData, bitMaskValue, applyStylingFn, sanitizer) {
        deferredBindingQueue.length && flushDeferredBindings();
        for (var bitMask = normalizeBitMaskValue(bitMaskValue), stylingMapsSyncFn = getStylingMapsSyncFn(), mapsMode = (bitMask & getGuardMask(context, 2)) > 0 ? 1 : 0, i = getPropValuesStartPosition(context); i < context.length; ) {
            var valuesCount = getValuesCount(context, i);
            if (bitMask & getGuardMask(context, i)) {
                for (var valueApplied = !1, prop = getProp$1(context, i), valuesCountUpToDefault = valuesCount - 1, defaultValue = getBindingValue(context, i, valuesCountUpToDefault), j = 0; j < valuesCountUpToDefault; j++) {
                    var bindingIndex = getBindingValue(context, i, j), value = bindingData[bindingIndex];
                    if (isStylingValueDefined(value)) {
                        applyStylingFn(renderer, element, prop, sanitizer && isSanitizationRequired(context, i) ? sanitizer(prop, value, 2) : value, bindingIndex);
                        valueApplied = !0;
                        break;
                    }
                }
                if (stylingMapsSyncFn) {
                    var valueAppliedWithinMap = stylingMapsSyncFn(context, renderer, element, bindingData, applyStylingFn, sanitizer, mapsMode | (valueApplied ? 4 : 2), prop, defaultValue);
                    valueApplied = valueApplied || valueAppliedWithinMap;
                }
                valueApplied || applyStylingFn(renderer, element, prop, defaultValue);
            }
            i += 3 + valuesCount;
        }
        stylingMapsSyncFn && stylingMapsSyncFn(context, renderer, element, bindingData, applyStylingFn, sanitizer, mapsMode);
    }
    function normalizeBitMaskValue(value) {
        return !0 === value ? -1 : !1 === value ? 0 : value;
    }
    var _activeStylingMapApplyFn = null;
    function getStylingMapsSyncFn() {
        return _activeStylingMapApplyFn;
    }
    function setStylingMapsSyncFn(fn) {
        _activeStylingMapApplyFn = fn;
    }
    var setStyle$1 = function(renderer, native, prop, value) {
        if (value) {
            value = value.toString();
            renderer && isProceduralRenderer(renderer) ? renderer.setStyle(native, prop, value, RendererStyleFlags3.DashCase) : native.style.setProperty(prop, value);
        } else renderer && isProceduralRenderer(renderer) ? renderer.removeStyle(native, prop, RendererStyleFlags3.DashCase) : native.style.removeProperty(prop);
    }, setClass$1 = function(renderer, native, className, value) {
        "" !== className && (value ? renderer && isProceduralRenderer(renderer) ? renderer.addClass(native, className) : native.classList.add(className) : renderer && isProceduralRenderer(renderer) ? renderer.removeClass(native, className) : native.classList.remove(className));
    }, syncStylingMap = function(context, renderer, element, data, applyStylingFn, sanitizer, mode, targetProp, defaultValue) {
        var targetPropValueWasApplied = !1;
        if (getValuesCount(context, 2)) {
            var runTheSyncAlgorithm = !0, loopUntilEnd = !targetProp;
            if (loopUntilEnd && -2 & mode) {
                runTheSyncAlgorithm = !1;
                targetPropValueWasApplied = !0;
            }
            runTheSyncAlgorithm && (targetPropValueWasApplied = innerSyncStylingMap(context, renderer, element, data, applyStylingFn, sanitizer, mode, targetProp || null, 0, defaultValue || null));
            loopUntilEnd && resetSyncCursors();
        }
        return targetPropValueWasApplied;
    };
    function innerSyncStylingMap(context, renderer, element, data, applyStylingFn, sanitizer, mode, targetProp, currentMapIndex, defaultValue) {
        var targetPropValueWasApplied = !1;
        if (currentMapIndex < getValuesCount(context, 2)) {
            for (var bindingIndex = getBindingValue(context, 2, currentMapIndex), lStylingMap = data[bindingIndex], cursor = getCurrentSyncCursor(currentMapIndex); cursor < lStylingMap.length; ) {
                var prop = getMapProp(lStylingMap, cursor), iteratedTooFar = targetProp && prop > targetProp, isTargetPropMatched = !iteratedTooFar && prop === targetProp, value = getMapValue(lStylingMap, cursor), valueIsDefined = isStylingValueDefined(value), valueApplied = innerSyncStylingMap(context, renderer, element, data, applyStylingFn, sanitizer, iteratedTooFar ? mode : resolveInnerMapMode(mode, valueIsDefined, isTargetPropMatched), iteratedTooFar ? targetProp : prop, currentMapIndex + 1, defaultValue);
                if (iteratedTooFar) break;
                if (!valueApplied && isValueAllowedToBeApplied(mode, isTargetPropMatched)) {
                    var useDefault = isTargetPropMatched && !valueIsDefined, valueToApply = useDefault ? defaultValue : value, bindingIndexToApply = useDefault ? bindingIndex : null;
                    applyStylingFn(renderer, element, prop, sanitizer ? sanitizer(prop, valueToApply, 3) : valueToApply, bindingIndexToApply);
                    valueApplied = !0;
                }
                targetPropValueWasApplied = valueApplied && isTargetPropMatched;
                cursor += 2;
            }
            setCurrentSyncCursor(currentMapIndex, cursor);
        }
        return targetPropValueWasApplied;
    }
    function activeStylingMapFeature() {
        setStylingMapsSyncFn(syncStylingMap);
    }
    function resolveInnerMapMode(currentMode, valueIsDefined, isExactMatch) {
        var innerMode = currentMode;
        if (valueIsDefined || !isExactMatch || 4 & currentMode) {
            innerMode |= 4;
            innerMode &= -3;
        } else {
            innerMode |= 2;
            innerMode &= -5;
        }
        return innerMode;
    }
    function isValueAllowedToBeApplied(mode, isTargetPropMatched) {
        var doApplyValue = (1 & mode) > 0;
        doApplyValue ? 4 & mode && isTargetPropMatched && (doApplyValue = !1) : 2 & mode && (doApplyValue = isTargetPropMatched);
        return doApplyValue;
    }
    var MAP_CURSORS = [];
    function resetSyncCursors() {
        for (var i = 0; i < MAP_CURSORS.length; i++) MAP_CURSORS[i] = 1;
    }
    function getCurrentSyncCursor(mapIndex) {
        mapIndex >= MAP_CURSORS.length && MAP_CURSORS.push(1);
        return MAP_CURSORS[mapIndex];
    }
    function setCurrentSyncCursor(mapIndex, indexValue) {
        MAP_CURSORS[mapIndex] = indexValue;
    }
    function normalizeIntoStylingMap(bindingValue, newValues) {
        var lStylingMap = Array.isArray(bindingValue) ? bindingValue : [ null ];
        lStylingMap[0] = newValues || null;
        for (var j = 1; j < lStylingMap.length; j += 2) setMapValue(lStylingMap, j, null);
        var map, props = null, allValuesTrue = !1;
        if ("string" == typeof newValues) {
            if (newValues.length) {
                props = newValues.split(/\s+/);
                allValuesTrue = !0;
            }
        } else {
            props = newValues ? Object.keys(newValues) : null;
            map = newValues;
        }
        if (props) outer: for (var i = 0; i < props.length; i++) {
            var prop = props[i], value = !!allValuesTrue || map[prop];
            for (j = 1; j < lStylingMap.length; j += 2) {
                var propAtIndex = getMapProp(lStylingMap, j);
                if (prop <= propAtIndex) {
                    propAtIndex === prop ? setMapValue(lStylingMap, j, value) : lStylingMap.splice(j, 0, prop, value);
                    continue outer;
                }
            }
            lStylingMap.push(prop, value);
        }
        return lStylingMap;
    }
    function getMapProp(map, index) {
        return map[index + 0];
    }
    function setMapValue(map, index, value) {
        map[index + 1] = value;
    }
    function getMapValue(map, index) {
        return map[index + 1];
    }
    !function() {
        function TStylingContextDebug(context) {
            this.context = context;
        }
        Object.defineProperty(TStylingContextDebug.prototype, "isLocked", {
            get: function() {
                return isContextLocked(this.context);
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(TStylingContextDebug.prototype, "entries", {
            get: function() {
                for (var context = this.context, entries = {}, i = 2; i < context.length; ) {
                    var valuesCount = getValuesCount(context, i);
                    if (valuesCount) {
                        for (var prop = getProp$1(context, i), guardMask = getGuardMask(context, i), defaultValue = getDefaultValue(context, i), sanitizationRequired = isSanitizationRequired(context, i), bindingsStartPosition = i + 3, sources = [], j = 0; j < valuesCount; j++) sources.push(context[bindingsStartPosition + j]);
                        entries[prop] = {
                            prop: prop,
                            guardMask: guardMask,
                            sanitizationRequired: sanitizationRequired,
                            valuesCount: valuesCount,
                            defaultValue: defaultValue,
                            sources: sources
                        };
                    }
                    i += 3 + valuesCount;
                }
                return entries;
            },
            enumerable: !0,
            configurable: !0
        });
    }();
    var NodeStylingDebug = function() {
        function NodeStylingDebug(context, _data, _isClassBased) {
            this.context = context;
            this._data = _data;
            this._isClassBased = _isClassBased;
            this._sanitizer = null;
        }
        NodeStylingDebug.prototype.overrideSanitizer = function(sanitizer) {
            this._sanitizer = sanitizer;
        };
        Object.defineProperty(NodeStylingDebug.prototype, "summary", {
            get: function() {
                var entries = {};
                this._mapValues(function(prop, value, bindingIndex) {
                    entries[prop] = {
                        prop: prop,
                        value: value,
                        bindingIndex: bindingIndex
                    };
                });
                return entries;
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(NodeStylingDebug.prototype, "values", {
            get: function() {
                var entries = {};
                this._mapValues(function(prop, value) {
                    entries[prop] = value;
                });
                return entries;
            },
            enumerable: !0,
            configurable: !0
        });
        NodeStylingDebug.prototype._mapValues = function(fn) {
            var mockElement = {};
            getValuesCount(this.context, 2) > 0 && activeStylingMapFeature();
            var mapFn = function(renderer, element, prop, value, bindingIndex) {
                fn(prop, value, bindingIndex || null);
            }, sanitizer = this._isClassBased ? null : this._sanitizer || getCurrentOrLViewSanitizer(this._data);
            applyStyling(this.context, null, mockElement, this._data, !0, mapFn, sanitizer);
        };
        return NodeStylingDebug;
    }();
    function toDebug(obj) {
        if (obj) {
            var debug = obj.debug;
            assertDefined(debug, "Object does not have a debug representation.");
            return debug;
        }
        return obj;
    }
    function toHtml(value, includeChildren) {
        void 0 === includeChildren && (includeChildren = !1);
        var node = unwrapRNode(value);
        if (node) {
            var isTextNode = node.nodeType === Node.TEXT_NODE, outerHTML = (isTextNode ? node.textContent : node.outerHTML) || "";
            return includeChildren || isTextNode ? outerHTML : outerHTML.split(node.innerHTML)[0] || null;
        }
        return null;
    }
    !function() {
        function LViewDebug(_raw_lView) {
            this._raw_lView = _raw_lView;
        }
        Object.defineProperty(LViewDebug.prototype, "flags", {
            get: function() {
                var flags = this._raw_lView[FLAGS];
                return {
                    __raw__flags__: flags,
                    initPhaseState: 3 & flags,
                    creationMode: !!(4 & flags),
                    firstViewPass: !!(8 & flags),
                    checkAlways: !!(16 & flags),
                    dirty: !!(64 & flags),
                    attached: !!(128 & flags),
                    destroyed: !!(256 & flags),
                    isRoot: !!(512 & flags),
                    indexWithinInitPhase: flags >> 10
                };
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(LViewDebug.prototype, "parent", {
            get: function() {
                return toDebug(this._raw_lView[PARENT]);
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(LViewDebug.prototype, "host", {
            get: function() {
                return toHtml(this._raw_lView[HOST], !0);
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(LViewDebug.prototype, "context", {
            get: function() {
                return this._raw_lView[CONTEXT];
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(LViewDebug.prototype, "nodes", {
            get: function() {
                var lView = this._raw_lView;
                return toDebugNodes(lView[TVIEW].firstChild, lView);
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(LViewDebug.prototype, "__other__", {
            get: function() {
                return {
                    tView: this._raw_lView[TVIEW],
                    cleanup: this._raw_lView[CLEANUP],
                    injector: this._raw_lView[INJECTOR$1],
                    rendererFactory: this._raw_lView[RENDERER_FACTORY],
                    renderer: this._raw_lView[RENDERER],
                    sanitizer: this._raw_lView[SANITIZER],
                    childHead: toDebug(this._raw_lView[CHILD_HEAD]),
                    next: toDebug(this._raw_lView[NEXT]),
                    childTail: toDebug(this._raw_lView[CHILD_TAIL]),
                    declarationView: toDebug(this._raw_lView[DECLARATION_VIEW]),
                    contentQueries: this._raw_lView[CONTENT_QUERIES],
                    queries: this._raw_lView[QUERIES],
                    tHost: this._raw_lView[T_HOST],
                    bindingIndex: this._raw_lView[BINDING_INDEX]
                };
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(LViewDebug.prototype, "childViews", {
            get: function() {
                for (var childViews = [], child = this.__other__.childHead; child; ) {
                    childViews.push(child);
                    child = child.__other__.next;
                }
                return childViews;
            },
            enumerable: !0,
            configurable: !0
        });
    }();
    function toDebugNodes(tNode, lView) {
        if (tNode) {
            for (var debugNodes = [], tNodeCursor = tNode; tNodeCursor; ) {
                var rawValue = lView[tNode.index], native = unwrapRNode(rawValue), componentLViewDebug = isStylingContext(rawValue) ? null : toDebug(readLViewValue(rawValue)), styles = null, classes = null;
                if (runtimeIsNewStylingInUse()) {
                    styles = tNode.newStyles ? new NodeStylingDebug(tNode.newStyles, lView, !1) : null;
                    classes = tNode.newClasses ? new NodeStylingDebug(tNode.newClasses, lView, !0) : null;
                }
                debugNodes.push({
                    html: toHtml(native),
                    native: native,
                    styles: styles,
                    classes: classes,
                    nodes: toDebugNodes(tNode.child, lView),
                    component: componentLViewDebug
                });
                tNodeCursor = tNodeCursor.next;
            }
            return debugNodes;
        }
        return null;
    }
    !function() {
        function LContainerDebug(_raw_lContainer) {
            this._raw_lContainer = _raw_lContainer;
        }
        Object.defineProperty(LContainerDebug.prototype, "activeIndex", {
            get: function() {
                return this._raw_lContainer[ACTIVE_INDEX];
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(LContainerDebug.prototype, "views", {
            get: function() {
                return this._raw_lContainer.slice(CONTAINER_HEADER_OFFSET).map(toDebug);
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(LContainerDebug.prototype, "parent", {
            get: function() {
                return toDebug(this._raw_lContainer[PARENT]);
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(LContainerDebug.prototype, "queries", {
            get: function() {
                return this._raw_lContainer[QUERIES];
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(LContainerDebug.prototype, "host", {
            get: function() {
                return this._raw_lContainer[HOST];
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(LContainerDebug.prototype, "native", {
            get: function() {
                return this._raw_lContainer[NATIVE];
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(LContainerDebug.prototype, "__other__", {
            get: function() {
                return {
                    next: toDebug(this._raw_lContainer[NEXT])
                };
            },
            enumerable: !0,
            configurable: !0
        });
    }();
    function readLViewValue(value) {
        for (;Array.isArray(value); ) {
            if (value.length >= HEADER_OFFSET - 1) return value;
            value = value[HOST];
        }
        return null;
    }
    var I18NDebugItem = function() {
        function I18NDebugItem(__raw_opCode, _lView, nodeIndex, type) {
            this.__raw_opCode = __raw_opCode;
            this._lView = _lView;
            this.nodeIndex = nodeIndex;
            this.type = type;
        }
        Object.defineProperty(I18NDebugItem.prototype, "tNode", {
            get: function() {
                return getTNode(this.nodeIndex, this._lView);
            },
            enumerable: !0,
            configurable: !0
        });
        return I18NDebugItem;
    }();
    (function() {
        function I18nMutateOpCodesDebug(__raw_opCodes, __lView) {
            this.__raw_opCodes = __raw_opCodes;
            this.__lView = __lView;
        }
        Object.defineProperty(I18nMutateOpCodesDebug.prototype, "operations", {
            get: function() {
                for (var _b = this, __lView = _b.__lView, __raw_opCodes = _b.__raw_opCodes, results = [], i = 0; i < __raw_opCodes.length; i++) {
                    var opCode = __raw_opCodes[i], result = void 0;
                    "string" == typeof opCode && (result = {
                        __raw_opCode: opCode,
                        type: "Create Text Node",
                        nodeIndex: __raw_opCodes[++i],
                        text: opCode
                    });
                    if ("number" == typeof opCode) switch (7 & opCode) {
                      case 1:
                        result = new I18NDebugItem(opCode, __lView, opCode >>> 17, "AppendChild");
                        break;

                      case 0:
                        result = new I18NDebugItem(opCode, __lView, opCode >>> 3, "Select");
                        break;

                      case 5:
                        var elementIndex = opCode >>> 3;
                        result = new I18NDebugItem(opCode, __lView, elementIndex, "ElementEnd");
                        break;

                      case 4:
                        (result = new I18NDebugItem(opCode, __lView, elementIndex = opCode >>> 3, "Attr")).attrName = __raw_opCodes[++i];
                        result.attrValue = __raw_opCodes[++i];
                    }
                    if (!result) switch (opCode) {
                      case COMMENT_MARKER:
                        result = {
                            __raw_opCode: opCode,
                            type: "COMMENT_MARKER",
                            commentValue: __raw_opCodes[++i],
                            nodeIndex: __raw_opCodes[++i]
                        };
                        break;

                      case ELEMENT_MARKER:
                        result = {
                            __raw_opCode: opCode,
                            type: "ELEMENT_MARKER"
                        };
                    }
                    result || (result = {
                        __raw_opCode: opCode,
                        type: "Unknown Op Code",
                        code: opCode
                    });
                    results.push(result);
                }
                return results;
            },
            enumerable: !0,
            configurable: !0
        });
    })(), function() {
        function I18nUpdateOpCodesDebug(__raw_opCodes, icus, __lView) {
            this.__raw_opCodes = __raw_opCodes;
            this.icus = icus;
            this.__lView = __lView;
        }
        Object.defineProperty(I18nUpdateOpCodesDebug.prototype, "operations", {
            get: function() {
                for (var _b = this, __lView = _b.__lView, __raw_opCodes = _b.__raw_opCodes, icus = _b.icus, results = [], i = 0; i < __raw_opCodes.length; i++) {
                    for (var checkBit = __raw_opCodes[i], skipCodes = __raw_opCodes[++i], value = "", j = i + 1; j <= i + skipCodes; j++) {
                        var opCode = __raw_opCodes[j];
                        if ("string" == typeof opCode) value += opCode; else if ("number" == typeof opCode) if (opCode < 0) value += "�" + (-opCode - 1) + "�"; else {
                            var nodeIndex = opCode >>> 2, tIcuIndex = void 0, tIcu = void 0;
                            switch (3 & opCode) {
                              case 1:
                                var attrName = __raw_opCodes[++j], sanitizeFn = __raw_opCodes[++j];
                                results.push({
                                    __raw_opCode: opCode,
                                    checkBit: checkBit,
                                    type: "Attr",
                                    attrValue: value,
                                    attrName: attrName,
                                    sanitizeFn: sanitizeFn
                                });
                                break;

                              case 0:
                                results.push({
                                    __raw_opCode: opCode,
                                    checkBit: checkBit,
                                    type: "Text",
                                    nodeIndex: nodeIndex,
                                    text: value
                                });
                                break;

                              case 2:
                                tIcu = icus[tIcuIndex = __raw_opCodes[++j]];
                                var result = new I18NDebugItem(opCode, __lView, nodeIndex, "IcuSwitch");
                                result.tIcuIndex = tIcuIndex;
                                result.checkBit = checkBit;
                                result.mainBinding = value;
                                result.tIcu = tIcu;
                                results.push(result);
                                break;

                              case 3:
                                tIcu = icus[tIcuIndex = __raw_opCodes[++j]];
                                (result = new I18NDebugItem(opCode, __lView, nodeIndex, "IcuUpdate")).tIcuIndex = tIcuIndex;
                                result.checkBit = checkBit;
                                result.tIcu = tIcu;
                                results.push(result);
                            }
                        }
                    }
                    i += skipCodes;
                }
                return results;
            },
            enumerable: !0,
            configurable: !0
        });
    }();
    var _CLEAN_PROMISE = Promise.resolve(null);
    function refreshDescendantViews(lView) {
        var tView = lView[TVIEW], creationMode = isCreationMode(lView);
        tView.firstTemplatePass = !1;
        lView[BINDING_INDEX] = tView.bindingStartIndex;
        if (!creationMode) {
            var checkNoChangesMode_1 = getCheckNoChangesMode();
            executePreOrderHooks(lView, tView, checkNoChangesMode_1, void 0);
            refreshDynamicEmbeddedViews(lView);
            refreshContentQueries(tView, lView);
            resetPreOrderHookFlags(lView);
            executeHooks(lView, tView.contentHooks, tView.contentCheckHooks, checkNoChangesMode_1, 1, void 0);
            setHostBindings(tView, lView);
        }
        creationMode && tView.staticContentQueries && refreshContentQueries(tView, lView);
        refreshChildComponents(tView.components);
    }
    function setHostBindings(tView, viewData) {
        var selectedIndex = getSelectedIndex();
        try {
            if (tView.expandoInstructions) {
                var bindingRootIndex_1 = viewData[BINDING_INDEX] = tView.expandoStartIndex;
                setBindingRoot(bindingRootIndex_1);
                for (var currentDirectiveIndex = -1, currentElementIndex = -1, i = 0; i < tView.expandoInstructions.length; i++) {
                    var instruction = tView.expandoInstructions[i];
                    if ("number" == typeof instruction) {
                        if (instruction <= 0) {
                            setActiveHostElement(currentElementIndex = -instruction);
                            var providerCount = tView.expandoInstructions[++i];
                            currentDirectiveIndex = bindingRootIndex_1 += INJECTOR_BLOOM_PARENT_SIZE + providerCount;
                        } else bindingRootIndex_1 += instruction;
                        setBindingRoot(bindingRootIndex_1);
                    } else {
                        if (null !== instruction) {
                            viewData[BINDING_INDEX] = bindingRootIndex_1;
                            instruction(2, unwrapRNode(viewData[currentDirectiveIndex]), currentElementIndex);
                            incrementActiveDirectiveId();
                        }
                        currentDirectiveIndex++;
                    }
                }
            }
        } finally {
            setActiveHostElement(selectedIndex);
        }
    }
    function refreshContentQueries(tView, lView) {
        if (null != tView.contentQueries) {
            setCurrentQueryIndex(0);
            for (var i = 0; i < tView.contentQueries.length; i++) {
                var directiveDefIdx = tView.contentQueries[i];
                tView.data[directiveDefIdx].contentQueries(2, lView[directiveDefIdx], directiveDefIdx);
            }
        }
    }
    function refreshChildComponents(components) {
        if (null != components) for (var i = 0; i < components.length; i++) componentRefresh(components[i]);
    }
    function elementCreate(name, overriddenRenderer) {
        var rendererToUse = overriddenRenderer || getLView()[RENDERER], namespace = getNamespace();
        return isProceduralRenderer(rendererToUse) ? rendererToUse.createElement(name, namespace) : null === namespace ? rendererToUse.createElement(name) : rendererToUse.createElementNS(namespace, name);
    }
    function createLView(parentLView, tView, context, flags, host, tHostNode, rendererFactory, renderer, sanitizer, injector) {
        var lView = tView.blueprint.slice();
        lView[HOST] = host;
        lView[FLAGS] = 140 | flags;
        resetPreOrderHookFlags(lView);
        lView[PARENT] = lView[DECLARATION_VIEW] = parentLView;
        lView[CONTEXT] = context;
        lView[RENDERER_FACTORY] = rendererFactory || parentLView && parentLView[RENDERER_FACTORY];
        lView[RENDERER] = renderer || parentLView && parentLView[RENDERER];
        lView[SANITIZER] = sanitizer || parentLView && parentLView[SANITIZER] || null;
        lView[INJECTOR$1] = injector || parentLView && parentLView[INJECTOR$1] || null;
        lView[T_HOST] = tHostNode;
        return lView;
    }
    function getOrCreateTNode(tView, tHostNode, index, type, name, attrs) {
        var adjustedIndex = index + HEADER_OFFSET, tNode = tView.data[adjustedIndex] || createTNodeAtIndex(tView, tHostNode, adjustedIndex, type, name, attrs, index);
        setPreviousOrParentTNode(tNode, !0);
        return tNode;
    }
    function createTNodeAtIndex(tView, tHostNode, adjustedIndex, type, name, attrs, index) {
        var previousOrParentTNode = getPreviousOrParentTNode(), isParent = getIsParent(), parent = isParent ? previousOrParentTNode : previousOrParentTNode && previousOrParentTNode.parent, tNode = tView.data[adjustedIndex] = createTNode(parent && parent !== tHostNode ? parent : null, type, adjustedIndex, name, attrs);
        0 === index && (tView.firstChild = tNode);
        previousOrParentTNode && (!isParent || null != previousOrParentTNode.child || null === tNode.parent && 2 !== previousOrParentTNode.type ? isParent || (previousOrParentTNode.next = tNode) : previousOrParentTNode.child = tNode);
        return tNode;
    }
    function assignTViewNodeToLView(tView, tParentNode, index, lView) {
        var tNode = tView.node;
        null == tNode && (tView.node = tNode = createTNode(tParentNode, 2, index, null, null));
        return lView[T_HOST] = tNode;
    }
    function allocExpando(view, numSlotsToAlloc) {
        var tView = view[TVIEW];
        if (tView.firstTemplatePass) {
            for (var i = 0; i < numSlotsToAlloc; i++) {
                tView.blueprint.push(null);
                tView.data.push(null);
                view.push(null);
            }
            tView.expandoInstructions ? tView.expandoInstructions.push(numSlotsToAlloc) : tView.expandoStartIndex += numSlotsToAlloc;
        }
    }
    function createEmbeddedViewAndNode(tView, context, declarationView, queries, injectorIndex) {
        var _isParent = getIsParent(), _previousOrParentTNode = getPreviousOrParentTNode();
        setPreviousOrParentTNode(null, !0);
        var lView = createLView(declarationView, tView, context, 16, null, null);
        lView[DECLARATION_VIEW] = declarationView;
        queries && (lView[QUERIES] = queries.createView());
        assignTViewNodeToLView(tView, null, -1, lView);
        tView.firstTemplatePass && (tView.node.injectorIndex = injectorIndex);
        setPreviousOrParentTNode(_previousOrParentTNode, _isParent);
        return lView;
    }
    function renderEmbeddedTemplate(viewToRender, tView, context) {
        var oldView, _isParent = getIsParent(), _previousOrParentTNode = getPreviousOrParentTNode();
        if (512 & viewToRender[FLAGS]) tickRootContext(getRootContext(viewToRender)); else try {
            setPreviousOrParentTNode(null, !0);
            oldView = enterView(viewToRender, viewToRender[T_HOST]);
            resetPreOrderHookFlags(viewToRender);
            executeTemplate(tView.template, getRenderFlags(viewToRender), context);
            viewToRender[TVIEW].firstTemplatePass = !1;
            refreshDescendantViews(viewToRender);
        } finally {
            leaveView(oldView);
            setPreviousOrParentTNode(_previousOrParentTNode, _isParent);
        }
    }
    function renderComponentOrTemplate(hostView, context, templateFn) {
        var rendererFactory = hostView[RENDERER_FACTORY], oldView = enterView(hostView, hostView[T_HOST]), normalExecutionPath = !getCheckNoChangesMode(), creationModeIsActive = isCreationMode(hostView);
        try {
            normalExecutionPath && !creationModeIsActive && rendererFactory.begin && rendererFactory.begin();
            if (creationModeIsActive) {
                templateFn && executeTemplate(templateFn, 1, context);
                refreshDescendantViews(hostView);
                hostView[FLAGS] &= -5;
            }
            resetPreOrderHookFlags(hostView);
            templateFn && executeTemplate(templateFn, 2, context);
            refreshDescendantViews(hostView);
        } finally {
            normalExecutionPath && !creationModeIsActive && rendererFactory.end && rendererFactory.end();
            leaveView(oldView);
        }
    }
    function executeTemplate(templateFn, rf, context) {
        ɵɵnamespaceHTML();
        var prevSelectedIndex = getSelectedIndex();
        try {
            setActiveHostElement(null);
            templateFn(rf, context);
        } finally {
            setSelectedIndex(prevSelectedIndex);
        }
    }
    function getRenderFlags(view) {
        return isCreationMode(view) ? 1 : 2;
    }
    function setNodeStylingTemplate(tView, tNode, attrs, attrsStartIndex) {
        if (tView.firstTemplatePass && !tNode.stylingTemplate) {
            var stylingAttrsStartIndex = attrsStylingIndexOf(attrs, attrsStartIndex);
            stylingAttrsStartIndex >= 0 && (tNode.stylingTemplate = initializeStaticContext(attrs, stylingAttrsStartIndex));
        }
    }
    function executeContentQueries(tView, tNode, lView) {
        if (isContentQueryHost(tNode)) for (var end = tNode.directiveEnd, directiveIndex = tNode.directiveStart; directiveIndex < end; directiveIndex++) {
            var def = tView.data[directiveIndex];
            def.contentQueries && def.contentQueries(1, lView[directiveIndex], directiveIndex);
        }
    }
    function createDirectivesAndLocals(tView, lView, localRefs, localRefExtractor) {
        void 0 === localRefExtractor && (localRefExtractor = getNativeByTNode);
        if (getBindingsEnabled()) {
            var previousOrParentTNode = getPreviousOrParentTNode();
            tView.firstTemplatePass && resolveDirectives(tView, lView, findDirectiveMatches(tView, lView, previousOrParentTNode), previousOrParentTNode, localRefs || null);
            instantiateAllDirectives(tView, lView, previousOrParentTNode);
            invokeDirectivesHostBindings(tView, lView, previousOrParentTNode);
            saveResolvedLocalsInData(lView, previousOrParentTNode, localRefExtractor);
            setActiveHostElement(null);
        }
    }
    function saveResolvedLocalsInData(viewData, tNode, localRefExtractor) {
        var localNames = tNode.localNames;
        if (localNames) for (var localIndex = tNode.index + 1, i = 0; i < localNames.length; i += 2) {
            var index = localNames[i + 1], value = -1 === index ? localRefExtractor(tNode, viewData) : viewData[index];
            viewData[localIndex++] = value;
        }
    }
    function getOrCreateTView(def) {
        return def.tView || (def.tView = createTView(-1, def.template, def.consts, def.vars, def.directiveDefs, def.pipeDefs, def.viewQuery, def.schemas));
    }
    function createTView(viewIndex, templateFn, consts, vars, directives, pipes, viewQuery, schemas) {
        var bindingStartIndex = HEADER_OFFSET + consts, initialViewLength = bindingStartIndex + vars, blueprint = createViewBlueprint(bindingStartIndex, initialViewLength);
        return blueprint[TVIEW] = {
            id: viewIndex,
            blueprint: blueprint,
            template: templateFn,
            viewQuery: viewQuery,
            node: null,
            data: blueprint.slice().fill(null, bindingStartIndex),
            bindingStartIndex: bindingStartIndex,
            viewQueryStartIndex: initialViewLength,
            expandoStartIndex: initialViewLength,
            expandoInstructions: null,
            firstTemplatePass: !0,
            staticViewQueries: !1,
            staticContentQueries: !1,
            preOrderHooks: null,
            preOrderCheckHooks: null,
            contentHooks: null,
            contentCheckHooks: null,
            viewHooks: null,
            viewCheckHooks: null,
            destroyHooks: null,
            cleanup: null,
            contentQueries: null,
            components: null,
            directiveRegistry: "function" == typeof directives ? directives() : directives,
            pipeRegistry: "function" == typeof pipes ? pipes() : pipes,
            firstChild: null,
            schemas: schemas
        };
    }
    function createViewBlueprint(bindingStartIndex, initialViewLength) {
        var blueprint = new Array(initialViewLength).fill(null, 0, bindingStartIndex).fill(NO_CHANGE, bindingStartIndex);
        blueprint[BINDING_INDEX] = bindingStartIndex;
        return blueprint;
    }
    function locateHostElement(factory, elementOrSelector) {
        var defaultRenderer = factory.createRenderer(null, null);
        return "string" == typeof elementOrSelector ? isProceduralRenderer(defaultRenderer) ? defaultRenderer.selectRootElement(elementOrSelector) : defaultRenderer.querySelector(elementOrSelector) : elementOrSelector;
    }
    function storeCleanupWithContext(lView, context, cleanupFn) {
        var lCleanup = getCleanup(lView);
        lCleanup.push(context);
        lView[TVIEW].firstTemplatePass && getTViewCleanup(lView).push(cleanupFn, lCleanup.length - 1);
    }
    function storeCleanupFn(view, cleanupFn) {
        getCleanup(view).push(cleanupFn);
        view[TVIEW].firstTemplatePass && getTViewCleanup(view).push(view[CLEANUP].length - 1, null);
    }
    function createTNode(tParent, type, adjustedIndex, tagName, attrs) {
        return {
            type: type,
            index: adjustedIndex,
            injectorIndex: tParent ? tParent.injectorIndex : -1,
            directiveStart: -1,
            directiveEnd: -1,
            propertyMetadataStartIndex: -1,
            propertyMetadataEndIndex: -1,
            flags: 0,
            providerIndexes: 0,
            tagName: tagName,
            attrs: attrs,
            localNames: null,
            initialInputs: void 0,
            inputs: void 0,
            outputs: void 0,
            tViews: null,
            next: null,
            projectionNext: null,
            child: null,
            parent: tParent,
            stylingTemplate: null,
            projection: null,
            onElementCreationFns: null,
            newStyles: null,
            newClasses: null
        };
    }
    function generatePropertyAliases(tNode, direction) {
        var tView = getLView()[TVIEW], propStore = null, start = tNode.directiveStart, end = tNode.directiveEnd;
        if (end > start) for (var isInput = 0 === direction, defs = tView.data, i = start; i < end; i++) {
            var directiveDef = defs[i], propertyAliasMap = isInput ? directiveDef.inputs : directiveDef.outputs;
            for (var publicName in propertyAliasMap) if (propertyAliasMap.hasOwnProperty(publicName)) {
                var internalName = propertyAliasMap[publicName];
                (propStore = propStore || {}).hasOwnProperty(publicName) ? propStore[publicName].push(i, publicName, internalName) : propStore[publicName] = [ i, publicName, internalName ];
            }
        }
        return propStore;
    }
    var ATTR_TO_PROP = {
        class: "className",
        for: "htmlFor",
        formaction: "formAction",
        innerHtml: "innerHTML",
        readonly: "readOnly",
        tabindex: "tabIndex"
    };
    function elementPropertyInternal(index, propName, value, sanitizer, nativeOnly, loadRendererFn) {
        var inputData, dataValue, lView = getLView(), element = getNativeByIndex(index, lView), tNode = getTNode(index, lView);
        if (!nativeOnly && (inputData = initializeTNodeInputs(tNode)) && (dataValue = inputData[propName])) {
            setInputsForProperty(lView, dataValue, value);
            isComponent(tNode) && markDirtyIfOnPush(lView, index + HEADER_OFFSET);
        } else if (3 === tNode.type) {
            savePropertyDebugData(tNode, lView, propName = ATTR_TO_PROP[propName] || propName, lView[TVIEW].data, nativeOnly);
            var renderer = loadRendererFn ? loadRendererFn(tNode, lView) : lView[RENDERER];
            value = null != sanitizer ? sanitizer(value, tNode.tagName || "", propName) : value;
            isProceduralRenderer(renderer) ? renderer.setProperty(element, propName, value) : isAnimationProp(propName) || (element.setProperty ? element.setProperty(propName, value) : element[propName] = value);
        }
    }
    function markDirtyIfOnPush(lView, viewIndex) {
        var childComponentLView = getComponentViewByIndex(viewIndex, lView);
        16 & childComponentLView[FLAGS] || (childComponentLView[FLAGS] |= 64);
    }
    function savePropertyDebugData(tNode, lView, propName, tData, nativeOnly) {
        var lastBindingIndex = lView[BINDING_INDEX] - 1, bindingMetadata = tData[lastBindingIndex];
        if (bindingMetadata[0] == INTERPOLATION_DELIMITER) {
            tData[lastBindingIndex] = propName + bindingMetadata;
            if (!nativeOnly) {
                -1 == tNode.propertyMetadataStartIndex && (tNode.propertyMetadataStartIndex = lastBindingIndex);
                tNode.propertyMetadataEndIndex = lastBindingIndex + 1;
            }
        }
    }
    function instantiateRootComponent(tView, viewData, def) {
        var rootTNode = getPreviousOrParentTNode();
        if (tView.firstTemplatePass) {
            def.providersResolver && def.providersResolver(def);
            generateExpandoInstructionBlock(tView, rootTNode, 1);
            baseResolveDirective(tView, viewData, def, def.factory);
        }
        var directive = getNodeInjectable(tView.data, viewData, viewData.length - 1, rootTNode);
        postProcessBaseDirective(viewData, rootTNode, directive);
        return directive;
    }
    function resolveDirectives(tView, viewData, directives, tNode, localRefs) {
        var exportsMap = localRefs ? {
            "": -1
        } : null;
        if (directives) {
            initNodeFlags(tNode, tView.data.length, directives.length);
            for (var i = 0; i < directives.length; i++) (def = directives[i]).providersResolver && def.providersResolver(def);
            generateExpandoInstructionBlock(tView, tNode, directives.length);
            var initialPreOrderHooksLength = tView.preOrderHooks && tView.preOrderHooks.length || 0, initialPreOrderCheckHooksLength = tView.preOrderCheckHooks && tView.preOrderCheckHooks.length || 0, nodeIndex = tNode.index - HEADER_OFFSET;
            for (i = 0; i < directives.length; i++) {
                var def, directiveDefIdx = tView.data.length;
                baseResolveDirective(tView, viewData, def = directives[i], def.factory);
                saveNameToExportMap(tView.data.length - 1, def, exportsMap);
                registerPreOrderHooks(directiveDefIdx, def, tView, nodeIndex, initialPreOrderHooksLength, initialPreOrderCheckHooksLength);
            }
        }
        exportsMap && cacheMatchingLocalNames(tNode, localRefs, exportsMap);
    }
    function instantiateAllDirectives(tView, lView, tNode) {
        var start = tNode.directiveStart, end = tNode.directiveEnd;
        !tView.firstTemplatePass && start < end && getOrCreateNodeInjectorForNode(tNode, lView);
        for (var i = start; i < end; i++) {
            var def = tView.data[i];
            isComponentDef(def) && addComponentLogic(lView, tNode, def);
            postProcessDirective(lView, getNodeInjectable(tView.data, lView, i, tNode), def, i);
        }
    }
    function invokeDirectivesHostBindings(tView, viewData, tNode) {
        var start = tNode.directiveStart, end = tNode.directiveEnd, expando = tView.expandoInstructions, firstTemplatePass = tView.firstTemplatePass, elementIndex = tNode.index - HEADER_OFFSET, selectedIndex = getSelectedIndex();
        try {
            setActiveHostElement(elementIndex);
            for (var i = start; i < end; i++) {
                var def = tView.data[i];
                if (def.hostBindings) {
                    invokeHostBindingsInCreationMode(def, expando, viewData[i], tNode, firstTemplatePass);
                    incrementActiveDirectiveId();
                } else firstTemplatePass && expando.push(null);
            }
        } finally {
            setActiveHostElement(selectedIndex);
        }
    }
    function invokeHostBindingsInCreationMode(def, expando, directive, tNode, firstTemplatePass) {
        var previousExpandoLength = expando.length;
        setCurrentDirectiveDef(def);
        def.hostBindings(1, directive, tNode.index - HEADER_OFFSET);
        setCurrentDirectiveDef(null);
        previousExpandoLength === expando.length && firstTemplatePass && expando.push(def.hostBindings);
    }
    function generateExpandoInstructionBlock(tView, tNode, directiveCount) {
        var elementIndex = -(tNode.index - HEADER_OFFSET), providerCount = tView.data.length - (65535 & tNode.providerIndexes);
        (tView.expandoInstructions || (tView.expandoInstructions = [])).push(elementIndex, providerCount, directiveCount);
    }
    function postProcessDirective(viewData, directive, def, directiveDefIdx) {
        var previousOrParentTNode = getPreviousOrParentTNode();
        postProcessBaseDirective(viewData, previousOrParentTNode, directive);
        previousOrParentTNode && previousOrParentTNode.attrs && setInputsFromAttrs(directiveDefIdx, directive, def, previousOrParentTNode);
        viewData[TVIEW].firstTemplatePass && def.contentQueries && (previousOrParentTNode.flags |= 4);
        isComponentDef(def) && (getComponentViewByIndex(previousOrParentTNode.index, viewData)[CONTEXT] = directive);
    }
    function postProcessBaseDirective(lView, previousOrParentTNode, directive) {
        var native = getNativeByTNode(previousOrParentTNode, lView);
        attachPatchData(directive, lView);
        native && attachPatchData(native, lView);
    }
    function findDirectiveMatches(tView, viewData, tNode) {
        var registry = tView.directiveRegistry, matches = null;
        if (registry) for (var i = 0; i < registry.length; i++) {
            var def = registry[i];
            if (isNodeMatchingSelectorList(tNode, def.selectors, !1)) {
                matches || (matches = []);
                diPublicInInjector(getOrCreateNodeInjectorForNode(getPreviousOrParentTNode(), viewData), viewData, def.type);
                if (isComponentDef(def)) {
                    1 & tNode.flags && throwMultipleComponentError(tNode);
                    tNode.flags = 1;
                    matches.unshift(def);
                } else matches.push(def);
            }
        }
        return matches;
    }
    function queueComponentIndexForCheck(previousOrParentTNode) {
        var tView = getLView()[TVIEW];
        (tView.components || (tView.components = [])).push(previousOrParentTNode.index);
    }
    function cacheMatchingLocalNames(tNode, localRefs, exportsMap) {
        if (localRefs) for (var localNames = tNode.localNames = [], i = 0; i < localRefs.length; i += 2) {
            var index = exportsMap[localRefs[i + 1]];
            if (null == index) throw new Error("Export of name '" + localRefs[i + 1] + "' not found!");
            localNames.push(localRefs[i], index);
        }
    }
    function saveNameToExportMap(index, def, exportsMap) {
        if (exportsMap) {
            if (def.exportAs) for (var i = 0; i < def.exportAs.length; i++) exportsMap[def.exportAs[i]] = index;
            def.template && (exportsMap[""] = index);
        }
    }
    function initNodeFlags(tNode, index, numberOfDirectives) {
        tNode.flags = 1 & tNode.flags;
        tNode.directiveStart = index;
        tNode.directiveEnd = index + numberOfDirectives;
        tNode.providerIndexes = index;
    }
    function baseResolveDirective(tView, viewData, def, directiveFactory) {
        tView.data.push(def);
        var nodeInjectorFactory = new NodeInjectorFactory(directiveFactory, isComponentDef(def), null);
        tView.blueprint.push(nodeInjectorFactory);
        viewData.push(nodeInjectorFactory);
    }
    function addComponentLogic(lView, previousOrParentTNode, def) {
        var native = getNativeByTNode(previousOrParentTNode, lView), tView = getOrCreateTView(def), rendererFactory = lView[RENDERER_FACTORY], componentView = addToViewTree(lView, createLView(lView, tView, null, def.onPush ? 64 : 16, lView[previousOrParentTNode.index], previousOrParentTNode, rendererFactory, rendererFactory.createRenderer(native, def)));
        componentView[T_HOST] = previousOrParentTNode;
        lView[previousOrParentTNode.index] = componentView;
        lView[TVIEW].firstTemplatePass && queueComponentIndexForCheck(previousOrParentTNode);
    }
    function setInputsFromAttrs(directiveIndex, instance, def, tNode) {
        var initialInputData = tNode.initialInputs;
        (void 0 === initialInputData || directiveIndex >= initialInputData.length) && (initialInputData = generateInitialInputs(directiveIndex, def.inputs, tNode));
        var initialInputs = initialInputData[directiveIndex];
        if (initialInputs) for (var setInput = def.setInput, i = 0; i < initialInputs.length; ) {
            var publicName = initialInputs[i++], privateName = initialInputs[i++], value = initialInputs[i++];
            setInput ? def.setInput(instance, value, publicName, privateName) : instance[privateName] = value;
        }
    }
    function generateInitialInputs(directiveIndex, inputs, tNode) {
        for (var initialInputData = tNode.initialInputs || (tNode.initialInputs = []), i_9 = initialInputData.length; i_9 <= directiveIndex; i_9++) initialInputData.push(null);
        for (var attrs = tNode.attrs, i = 0; i < attrs.length; ) {
            var attrName = attrs[i];
            if (0 !== attrName) if (5 !== attrName) {
                if ("number" == typeof attrName) break;
                var minifiedInputName = inputs[attrName], attrValue = attrs[i + 1];
                void 0 !== minifiedInputName && (initialInputData[directiveIndex] || (initialInputData[directiveIndex] = [])).push(attrName, minifiedInputName, attrValue);
                i += 2;
            } else i += 2; else i += 4;
        }
        return initialInputData;
    }
    function createLContainer(hostNative, currentView, native, tNode, isForViewContainerRef) {
        return new Array(hostNative, !0, isForViewContainerRef ? -1 : 0, currentView, null, null, tNode, native);
    }
    function refreshDynamicEmbeddedViews(lView) {
        for (var current = lView[CHILD_HEAD]; null !== current; current = current[NEXT]) if (-1 === current[ACTIVE_INDEX] && isLContainer(current)) for (var i = CONTAINER_HEADER_OFFSET; i < current.length; i++) {
            var dynamicViewData = current[i];
            renderEmbeddedTemplate(dynamicViewData, dynamicViewData[TVIEW], dynamicViewData[CONTEXT]);
        }
    }
    function componentRefresh(adjustedElementIndex) {
        var lView = getLView(), hostView = getComponentViewByIndex(adjustedElementIndex, lView);
        if ((viewAttachedToChangeDetector(hostView) || isCreationMode(lView)) && 80 & hostView[FLAGS]) {
            syncViewWithBlueprint(hostView);
            checkView(hostView, hostView[CONTEXT]);
        }
    }
    function syncViewWithBlueprint(componentView) {
        for (var componentTView = componentView[TVIEW], i = componentView.length; i < componentTView.blueprint.length; i++) componentView[i] = componentTView.blueprint[i];
    }
    function addToViewTree(lView, lViewOrLContainer) {
        lView[CHILD_HEAD] ? lView[CHILD_TAIL][NEXT] = lViewOrLContainer : lView[CHILD_HEAD] = lViewOrLContainer;
        lView[CHILD_TAIL] = lViewOrLContainer;
        return lViewOrLContainer;
    }
    function markViewDirty(lView) {
        for (;lView; ) {
            lView[FLAGS] |= 64;
            var parent_2 = getLViewParent(lView);
            if (isRootView(lView) && !parent_2) return lView;
            lView = parent_2;
        }
        return null;
    }
    function scheduleTick(rootContext, flags) {
        var nothingScheduled = 0 === rootContext.flags;
        rootContext.flags |= flags;
        if (nothingScheduled && rootContext.clean == _CLEAN_PROMISE) {
            var res_1;
            rootContext.clean = new Promise(function(r) {
                return res_1 = r;
            });
            rootContext.scheduler(function() {
                if (1 & rootContext.flags) {
                    rootContext.flags &= -2;
                    tickRootContext(rootContext);
                }
                if (2 & rootContext.flags) {
                    rootContext.flags &= -3;
                    var playerHandler = rootContext.playerHandler;
                    playerHandler && playerHandler.flushPlayers();
                }
                rootContext.clean = _CLEAN_PROMISE;
                res_1(null);
            });
        }
    }
    function tickRootContext(rootContext) {
        for (var i = 0; i < rootContext.components.length; i++) {
            var rootComponent = rootContext.components[i];
            renderComponentOrTemplate(readPatchedLView(rootComponent), rootComponent);
        }
    }
    function detectChangesInternal(view, context) {
        var rendererFactory = view[RENDERER_FACTORY];
        rendererFactory.begin && rendererFactory.begin();
        try {
            isCreationMode(view) && checkView(view, context);
            checkView(view, context);
        } catch (error) {
            handleError(view, error);
            throw error;
        } finally {
            rendererFactory.end && rendererFactory.end();
        }
    }
    function detectChangesInRootView(lView) {
        tickRootContext(lView[CONTEXT]);
    }
    function checkNoChangesInternal(view, context) {
        setCheckNoChangesMode(!0);
        try {
            detectChangesInternal(view, context);
        } finally {
            setCheckNoChangesMode(!1);
        }
    }
    function checkNoChangesInRootView(lView) {
        setCheckNoChangesMode(!0);
        try {
            detectChangesInRootView(lView);
        } finally {
            setCheckNoChangesMode(!1);
        }
    }
    function checkView(hostView, component) {
        var hostTView = hostView[TVIEW], oldView = enterView(hostView, hostView[T_HOST]), templateFn = hostTView.template, creationMode = isCreationMode(hostView);
        try {
            resetPreOrderHookFlags(hostView);
            creationMode && executeViewQueryFn(1, hostTView, component);
            executeTemplate(templateFn, getRenderFlags(hostView), component);
            refreshDescendantViews(hostView);
            creationMode && !hostTView.staticViewQueries || executeViewQueryFn(2, hostTView, component);
        } finally {
            leaveView(oldView);
        }
    }
    function executeViewQueryFn(flags, tView, component) {
        var viewQuery = tView.viewQuery;
        if (viewQuery) {
            setCurrentQueryIndex(tView.viewQueryStartIndex);
            viewQuery(flags, component);
        }
    }
    function storeBindingMetadata(lView, prefix, suffix) {
        void 0 === prefix && (prefix = "");
        void 0 === suffix && (suffix = "");
        var tData = lView[TVIEW].data, lastBindingIndex = lView[BINDING_INDEX] - 1;
        return null == tData[lastBindingIndex] ? tData[lastBindingIndex] = INTERPOLATION_DELIMITER + prefix + INTERPOLATION_DELIMITER + suffix : null;
    }
    var CLEAN_PROMISE = _CLEAN_PROMISE;
    function initializeTNodeInputs(tNode) {
        void 0 === tNode.inputs && (tNode.inputs = generatePropertyAliases(tNode, 0));
        return tNode.inputs;
    }
    function getCleanup(view) {
        return view[CLEANUP] || (view[CLEANUP] = []);
    }
    function getTViewCleanup(view) {
        return view[TVIEW].cleanup || (view[TVIEW].cleanup = []);
    }
    function loadComponentRenderer(tNode, lView) {
        return lView[tNode.index][RENDERER];
    }
    function handleError(lView, error) {
        var injector = lView[INJECTOR$1], errorHandler = injector ? injector.get(ErrorHandler, null) : null;
        errorHandler && errorHandler.handleError(error);
    }
    function setInputsForProperty(lView, inputs, value) {
        for (var tView = lView[TVIEW], i = 0; i < inputs.length; ) {
            var index = inputs[i++], publicName = inputs[i++], privateName = inputs[i++], instance = lView[index], def = tView.data[index];
            def.setInput ? def.setInput(instance, value, publicName, privateName) : instance[privateName] = value;
        }
    }
    function applyOnCreateInstructions(tNode) {
        var fns;
        if (fns = tNode.onElementCreationFns) {
            for (var i = 0; i < fns.length; i++) fns[i]();
            tNode.onElementCreationFns = null;
        }
    }
    function getParentInjectorTNode(location, startView, startTNode) {
        if (startTNode.parent && -1 !== startTNode.parent.injectorIndex) {
            for (var injectorIndex = startTNode.parent.injectorIndex, parentTNode_1 = startTNode.parent; null != parentTNode_1.parent && injectorIndex == parentTNode_1.injectorIndex; ) parentTNode_1 = parentTNode_1.parent;
            return parentTNode_1;
        }
        for (var viewOffset = getParentInjectorViewOffset(location), parentView = startView, parentTNode = startView[T_HOST]; viewOffset > 1; ) {
            parentTNode = (parentView = parentView[DECLARATION_VIEW])[T_HOST];
            viewOffset--;
        }
        return parentTNode;
    }
    function ɵɵallocHostVars(count) {
        var lView = getLView(), tView = lView[TVIEW];
        if (tView.firstTemplatePass) {
            queueHostBindingForCheck(tView, getCurrentDirectiveDef(), count);
            prefillHostVars(tView, lView, count);
        }
    }
    function queueHostBindingForCheck(tView, def, hostVars) {
        var expando = tView.expandoInstructions, length = expando.length;
        length >= 2 && expando[length - 2] === def.hostBindings ? expando[length - 1] = expando[length - 1] + hostVars : expando.push(def.hostBindings, hostVars);
    }
    function prefillHostVars(tView, lView, totalHostVars) {
        for (var i = 0; i < totalHostVars; i++) {
            lView.push(NO_CHANGE);
            tView.blueprint.push(NO_CHANGE);
            tView.data.push(null);
        }
    }
    function getLContainer(tNode, embeddedView) {
        var container = embeddedView[PARENT];
        return -1 === tNode.index ? isLContainer(container) ? container : null : container;
    }
    function getContainerRenderParent(tViewNode, view) {
        var container = getLContainer(tViewNode, view);
        return container ? nativeParentNode(view[RENDERER], container[NATIVE]) : null;
    }
    var projectionNodeStack = [];
    function walkTNodeTree(viewToWalk, action, renderer, renderParent, beforeNode) {
        for (var rootTNode = viewToWalk[TVIEW].node, projectionNodeIndex = -1, currentView = viewToWalk, tNode = rootTNode.child; tNode; ) {
            var nextTNode = null;
            if (3 === tNode.type || 4 === tNode.type) {
                executeNodeAction(action, renderer, renderParent, getNativeByTNode(tNode, currentView), tNode, beforeNode);
                var nodeOrContainer = currentView[tNode.index];
                if (isLContainer(nodeOrContainer)) {
                    executeNodeAction(action, renderer, renderParent, nodeOrContainer[NATIVE], tNode, beforeNode);
                    if (firstView = nodeOrContainer[CONTAINER_HEADER_OFFSET]) {
                        nextTNode = (currentView = firstView)[TVIEW].node;
                        beforeNode = nodeOrContainer[NATIVE];
                    }
                }
            } else if (0 === tNode.type) {
                var firstView, lContainer = currentView[tNode.index];
                executeNodeAction(action, renderer, renderParent, lContainer[NATIVE], tNode, beforeNode);
                if (firstView = lContainer[CONTAINER_HEADER_OFFSET]) {
                    nextTNode = (currentView = firstView)[TVIEW].node;
                    beforeNode = lContainer[NATIVE];
                }
            } else if (1 === tNode.type) {
                var componentView = findComponentView(currentView), head = componentView[T_HOST].projection[tNode.projection];
                if (Array.isArray(head)) for (var _i = 0, head_1 = head; _i < head_1.length; _i++) executeNodeAction(action, renderer, renderParent, head_1[_i], tNode, beforeNode); else {
                    projectionNodeStack[++projectionNodeIndex] = tNode;
                    projectionNodeStack[++projectionNodeIndex] = currentView;
                    head && (nextTNode = (currentView = componentView[PARENT])[TVIEW].data[head.index]);
                }
            } else nextTNode = tNode.child;
            if (null === nextTNode) {
                if (null === tNode.projectionNext && 2 & tNode.flags) {
                    currentView = projectionNodeStack[projectionNodeIndex--];
                    tNode = projectionNodeStack[projectionNodeIndex--];
                }
                nextTNode = 2 & tNode.flags ? tNode.projectionNext : 4 === tNode.type && tNode.child || tNode.next;
                for (;!nextTNode; ) {
                    if (null === (tNode = tNode.parent || currentView[T_HOST]) || tNode === rootTNode) return;
                    0 === tNode.type && (beforeNode = (currentView = getLViewParent(currentView))[tNode.index][NATIVE]);
                    if (2 === tNode.type) {
                        for (;!currentView[NEXT] && currentView[PARENT] && (!tNode.parent || !tNode.parent.next); ) {
                            if (tNode === rootTNode) return;
                            if (isLContainer(currentView = currentView[PARENT])) {
                                tNode = currentView[T_HOST];
                                beforeNode = (currentView = currentView[PARENT])[tNode.index][NATIVE];
                                break;
                            }
                            tNode = currentView[T_HOST];
                        }
                        nextTNode = currentView[NEXT] ? (currentView = currentView[NEXT])[T_HOST] : 4 === tNode.type && tNode.child || tNode.next;
                    } else nextTNode = tNode.next;
                }
            }
            tNode = nextTNode;
        }
    }
    function executeNodeAction(action, renderer, parent, node, tNode, beforeNode) {
        0 === action ? nativeInsertBefore(renderer, parent, node, beforeNode || null) : 1 === action ? nativeRemoveNode(renderer, node, isComponent(tNode)) : 2 === action && renderer.destroyNode(node);
    }
    function createTextNode(value, renderer) {
        return isProceduralRenderer(renderer) ? renderer.createText(renderStringify(value)) : renderer.createTextNode(renderStringify(value));
    }
    function addRemoveViewFromContainer(viewToWalk, insertMode, beforeNode) {
        var renderParent = getContainerRenderParent(viewToWalk[TVIEW].node, viewToWalk);
        renderParent && walkTNodeTree(viewToWalk, insertMode ? 0 : 1, viewToWalk[RENDERER], renderParent, beforeNode);
    }
    function renderDetachView(lView) {
        walkTNodeTree(lView, 1, lView[RENDERER], null);
    }
    function destroyViewTree(rootView) {
        var lViewOrLContainer = rootView[CHILD_HEAD];
        if (!lViewOrLContainer) return cleanUpView(rootView);
        for (;lViewOrLContainer; ) {
            var next = null;
            if (isLView(lViewOrLContainer)) next = lViewOrLContainer[CHILD_HEAD]; else {
                var firstView = lViewOrLContainer[CONTAINER_HEADER_OFFSET];
                firstView && (next = firstView);
            }
            if (!next) {
                for (;lViewOrLContainer && !lViewOrLContainer[NEXT] && lViewOrLContainer !== rootView; ) {
                    cleanUpView(lViewOrLContainer);
                    lViewOrLContainer = getParentState(lViewOrLContainer, rootView);
                }
                cleanUpView(lViewOrLContainer || rootView);
                next = lViewOrLContainer && lViewOrLContainer[NEXT];
            }
            lViewOrLContainer = next;
        }
    }
    function insertView(lView, lContainer, index) {
        var indexInContainer = CONTAINER_HEADER_OFFSET + index, containerLength = lContainer.length;
        index > 0 && (lContainer[indexInContainer - 1][NEXT] = lView);
        if (index < containerLength - CONTAINER_HEADER_OFFSET) {
            lView[NEXT] = lContainer[indexInContainer];
            lContainer.splice(CONTAINER_HEADER_OFFSET + index, 0, lView);
        } else {
            lContainer.push(lView);
            lView[NEXT] = null;
        }
        lView[PARENT] = lContainer;
        lView[QUERIES] && lView[QUERIES].insertView(index);
        lView[FLAGS] |= 128;
    }
    function detachView(lContainer, removeIndex) {
        if (!(lContainer.length <= CONTAINER_HEADER_OFFSET)) {
            var indexInContainer = CONTAINER_HEADER_OFFSET + removeIndex, viewToDetach = lContainer[indexInContainer];
            if (viewToDetach) {
                removeIndex > 0 && (lContainer[indexInContainer - 1][NEXT] = viewToDetach[NEXT]);
                lContainer.splice(CONTAINER_HEADER_OFFSET + removeIndex, 1);
                addRemoveViewFromContainer(viewToDetach, !1);
                128 & viewToDetach[FLAGS] && !(256 & viewToDetach[FLAGS]) && viewToDetach[QUERIES] && viewToDetach[QUERIES].removeView();
                viewToDetach[PARENT] = null;
                viewToDetach[NEXT] = null;
                viewToDetach[FLAGS] &= -129;
            }
            return viewToDetach;
        }
    }
    function removeView(lContainer, removeIndex) {
        var detachedView = detachView(lContainer, removeIndex);
        detachedView && destroyLView(detachedView);
    }
    function destroyLView(view) {
        if (!(256 & view[FLAGS])) {
            var renderer = view[RENDERER];
            isProceduralRenderer(renderer) && renderer.destroyNode && walkTNodeTree(view, 2, renderer, null);
            destroyViewTree(view);
        }
    }
    function getParentState(lViewOrLContainer, rootView) {
        var tNode;
        return isLView(lViewOrLContainer) && (tNode = lViewOrLContainer[T_HOST]) && 2 === tNode.type ? getLContainer(tNode, lViewOrLContainer) : lViewOrLContainer[PARENT] === rootView ? null : lViewOrLContainer[PARENT];
    }
    function cleanUpView(view) {
        if (isLView(view) && !(256 & view[FLAGS])) {
            view[FLAGS] &= -129;
            view[FLAGS] |= 256;
            executeOnDestroys(view);
            removeListeners(view);
            var hostTNode = view[T_HOST];
            hostTNode && 3 === hostTNode.type && isProceduralRenderer(view[RENDERER]) && view[RENDERER].destroy();
            viewAttachedToContainer(view) && view[QUERIES] && view[QUERIES].removeView();
        }
    }
    function removeListeners(lView) {
        var tCleanup = lView[TVIEW].cleanup;
        if (null != tCleanup) {
            for (var lCleanup = lView[CLEANUP], i = 0; i < tCleanup.length - 1; i += 2) if ("string" == typeof tCleanup[i]) {
                var idxOrTargetGetter = tCleanup[i + 1], target = "function" == typeof idxOrTargetGetter ? idxOrTargetGetter(lView) : unwrapRNode(lView[idxOrTargetGetter]), useCaptureOrSubIdx = tCleanup[i + 3];
                "boolean" == typeof useCaptureOrSubIdx ? target.removeEventListener(tCleanup[i], lCleanup[tCleanup[i + 2]], useCaptureOrSubIdx) : useCaptureOrSubIdx >= 0 ? lCleanup[useCaptureOrSubIdx]() : lCleanup[-useCaptureOrSubIdx].unsubscribe();
                i += 2;
            } else tCleanup[i].call(lCleanup[tCleanup[i + 1]]);
            lView[CLEANUP] = null;
        }
    }
    function executeOnDestroys(view) {
        var destroyHooks, tView = view[TVIEW];
        if (null != tView && null != (destroyHooks = tView.destroyHooks)) for (var i = 0; i < destroyHooks.length; i += 2) {
            var context = view[destroyHooks[i]];
            context instanceof NodeInjectorFactory || destroyHooks[i + 1].call(context);
        }
    }
    function getRenderParent(tNode, currentView) {
        if (isRootView(currentView)) return nativeParentNode(currentView[RENDERER], getNativeByTNode(tNode, currentView));
        var parent = getHighestElementOrICUContainer(tNode), renderParent = parent.parent;
        if (null == renderParent) {
            var hostTNode = currentView[T_HOST];
            return 2 === hostTNode.type ? getContainerRenderParent(hostTNode, currentView) : getHostNative(currentView);
        }
        var isIcuCase = parent && 5 === parent.type;
        if (isIcuCase && 2 & parent.flags) return getNativeByTNode(parent, currentView).parentNode;
        if (1 & renderParent.flags && !isIcuCase) {
            var tData = currentView[TVIEW].data, encapsulation = tData[tData[renderParent.index].directiveStart].encapsulation;
            if (encapsulation !== ViewEncapsulation.ShadowDom && encapsulation !== ViewEncapsulation.Native) return null;
        }
        return getNativeByTNode(renderParent, currentView);
    }
    function getHostNative(currentView) {
        var hostTNode = currentView[T_HOST];
        return hostTNode && 3 === hostTNode.type ? getNativeByTNode(hostTNode, getLViewParent(currentView)) : null;
    }
    function nativeInsertBefore(renderer, parent, child, beforeNode) {
        isProceduralRenderer(renderer) ? renderer.insertBefore(parent, child, beforeNode) : parent.insertBefore(child, beforeNode, !0);
    }
    function nativeAppendChild(renderer, parent, child) {
        isProceduralRenderer(renderer) ? renderer.appendChild(parent, child) : parent.appendChild(child);
    }
    function nativeAppendOrInsertBefore(renderer, parent, child, beforeNode) {
        beforeNode ? nativeInsertBefore(renderer, parent, child, beforeNode) : nativeAppendChild(renderer, parent, child);
    }
    function nativeRemoveChild(renderer, parent, child, isHostElement) {
        isProceduralRenderer(renderer) ? renderer.removeChild(parent, child, isHostElement) : parent.removeChild(child);
    }
    function nativeParentNode(renderer, node) {
        return isProceduralRenderer(renderer) ? renderer.parentNode(node) : node.parentNode;
    }
    function nativeNextSibling(renderer, node) {
        return isProceduralRenderer(renderer) ? renderer.nextSibling(node) : node.nextSibling;
    }
    function getNativeAnchorNode(parentTNode, lView) {
        if (2 === parentTNode.type) {
            var lContainer = getLContainer(parentTNode, lView);
            return getBeforeNodeForView(lContainer.indexOf(lView, CONTAINER_HEADER_OFFSET) - CONTAINER_HEADER_OFFSET, lContainer);
        }
        return 4 === parentTNode.type || 5 === parentTNode.type ? getNativeByTNode(parentTNode, lView) : null;
    }
    function appendChild(childEl, childTNode, currentView) {
        var renderParent = getRenderParent(childTNode, currentView);
        if (null != renderParent) {
            var renderer = currentView[RENDERER], anchorNode = getNativeAnchorNode(childTNode.parent || currentView[T_HOST], currentView);
            if (Array.isArray(childEl)) for (var _i = 0, childEl_1 = childEl; _i < childEl_1.length; _i++) nativeAppendOrInsertBefore(renderer, renderParent, childEl_1[_i], anchorNode); else nativeAppendOrInsertBefore(renderer, renderParent, childEl, anchorNode);
        }
    }
    function getHighestElementOrICUContainer(tNode) {
        for (;null != tNode.parent && (4 === tNode.parent.type || 5 === tNode.parent.type); ) tNode = tNode.parent;
        return tNode;
    }
    function getBeforeNodeForView(viewIndexInContainer, lContainer) {
        var nextViewIndex = CONTAINER_HEADER_OFFSET + viewIndexInContainer + 1;
        if (nextViewIndex < lContainer.length) {
            var lView_2 = lContainer[nextViewIndex], tViewNodeChild = lView_2[T_HOST].child;
            return null !== tViewNodeChild ? getNativeByTNode(tViewNodeChild, lView_2) : lContainer[NATIVE];
        }
        return lContainer[NATIVE];
    }
    function nativeRemoveNode(renderer, rNode, isHostElement) {
        var nativeParent = nativeParentNode(renderer, rNode);
        nativeParent && nativeRemoveChild(renderer, nativeParent, rNode, isHostElement);
    }
    function appendProjectedNodes(lView, tProjectionNode, selectorIndex, componentView) {
        var projectedView = componentView[PARENT], nodeToProject = componentView[T_HOST].projection[selectorIndex];
        if (Array.isArray(nodeToProject)) appendChild(nodeToProject, tProjectionNode, lView); else for (;nodeToProject; ) {
            if (1 === nodeToProject.type) appendProjectedNodes(lView, tProjectionNode, nodeToProject.projection, findComponentView(projectedView)); else {
                nodeToProject.flags |= 2;
                appendProjectedNode(nodeToProject, tProjectionNode, lView, projectedView);
            }
            nodeToProject = nodeToProject.projectionNext;
        }
    }
    function appendProjectedNode(projectedTNode, tProjectionNode, currentView, projectionView) {
        var native = getNativeByTNode(projectedTNode, projectionView);
        appendChild(native, tProjectionNode, currentView);
        attachPatchData(native, projectionView);
        var nodeOrContainer = projectionView[projectedTNode.index];
        if (0 === projectedTNode.type) for (var i = CONTAINER_HEADER_OFFSET; i < nodeOrContainer.length; i++) addRemoveViewFromContainer(nodeOrContainer[i], !0, nodeOrContainer[NATIVE]); else {
            if (4 === projectedTNode.type) for (var ngContainerChildTNode = projectedTNode.child; ngContainerChildTNode; ) {
                appendProjectedNode(ngContainerChildTNode, tProjectionNode, currentView, projectionView);
                ngContainerChildTNode = ngContainerChildTNode.next;
            }
            isLContainer(nodeOrContainer) && appendChild(nodeOrContainer[NATIVE], tProjectionNode, currentView);
        }
    }
    function stylingInit() {
        var lView = getLView();
        updateLastDirectiveIndex(getTNode(getSelectedIndex(), lView), getActiveDirectiveStylingIndex());
    }
    function styleSanitizer(sanitizer) {
        setCurrentStyleSanitizer(sanitizer);
    }
    function styleProp(prop, value, suffix) {
        _stylingProp(prop, resolveStylePropValue(value, suffix), !1);
    }
    function classProp(className, value) {
        _stylingProp(className, value, !0);
    }
    function _stylingProp(prop, value, isClassBased) {
        var index = getSelectedIndex(), lView = getLView(), bindingIndex = lView[BINDING_INDEX]++, tNode = getTNode(index, lView), defer = getActiveDirectiveSuperClassHeight() > 0;
        if (isClassBased) updateClassBinding(getClassesContext(tNode), lView, prop, bindingIndex, value, defer, !1); else {
            var sanitizer = getCurrentOrLViewSanitizer(lView);
            updateStyleBinding(getStylesContext(tNode), lView, prop, bindingIndex, value, sanitizer, defer, !1);
        }
    }
    function styleMap(styles) {
        _stylingMap(styles, !1);
    }
    function classMap(classes) {
        _stylingMap(classes, !0);
    }
    function _stylingMap(value, isClassBased) {
        activeStylingMapFeature();
        var index = getSelectedIndex(), lView = getLView(), bindingIndex = lView[BINDING_INDEX]++;
        if (value !== NO_CHANGE) {
            var tNode = getTNode(index, lView), defer = getActiveDirectiveSuperClassHeight() > 0, oldValue = lView[bindingIndex], valueHasChanged = hasValueChanged$1(oldValue, value), lStylingMap = normalizeIntoStylingMap(oldValue, value);
            if (isClassBased) updateClassBinding(getClassesContext(tNode), lView, null, bindingIndex, lStylingMap, defer, valueHasChanged); else {
                var sanitizer = getCurrentOrLViewSanitizer(lView);
                updateStyleBinding(getStylesContext(tNode), lView, null, bindingIndex, lStylingMap, sanitizer, defer, valueHasChanged);
            }
        }
    }
    function stylingApply() {
        var index = getSelectedIndex(), lView = getLView(), tNode = getTNode(index, lView), renderer = getRenderer(tNode, lView), native = getNativeFromLView(index, lView), directiveIndex = getActiveDirectiveStylingIndex();
        applyClasses(renderer, lView, getClassesContext(tNode), native, directiveIndex);
        var sanitizer = getCurrentOrLViewSanitizer(lView);
        applyStyles(renderer, lView, getStylesContext(tNode), native, directiveIndex, sanitizer);
        setCurrentStyleSanitizer(null);
    }
    function getNativeFromLView(index, viewData) {
        for (var slotValue = viewData[index + HEADER_OFFSET], wrapper = viewData; Array.isArray(slotValue); ) {
            wrapper = slotValue;
            slotValue = slotValue[HOST];
        }
        return isStylingContext(wrapper) ? wrapper[0] : slotValue;
    }
    function getRenderer(tNode, lView) {
        return 3 === tNode.type ? lView[RENDERER] : null;
    }
    function registerInitialStylingIntoContext(tNode, attrs, startIndex) {
        for (var classesContext, stylesContext, mode = -1, i = startIndex; i < attrs.length; i++) {
            var attr = attrs[i];
            "number" == typeof attr ? mode = attr : 1 == mode ? registerBinding(classesContext = classesContext || getClassesContext(tNode), -1, attr, !0, !1) : 2 == mode && registerBinding(stylesContext = stylesContext || getStylesContext(tNode), -1, attr, attrs[++i], !1);
        }
    }
    function getActiveDirectiveStylingIndex() {
        return getActiveDirectiveId() + getActiveDirectiveSuperClassDepth();
    }
    function updateLastDirectiveIndex(tNode, directiveIndex) {
        updateContextDirectiveIndex(getClassesContext(tNode), directiveIndex);
        updateContextDirectiveIndex(getStylesContext(tNode), directiveIndex);
    }
    function getStylesContext(tNode) {
        return getContext(tNode, !1);
    }
    function getClassesContext(tNode) {
        return getContext(tNode, !0);
    }
    function getContext(tNode, isClassBased) {
        var context = isClassBased ? tNode.newClasses : tNode.newStyles;
        if (!context) {
            context = allocTStylingContext();
            isClassBased ? tNode.newClasses = context : tNode.newStyles = context;
        }
        return context;
    }
    function resolveStylePropValue(value, suffix) {
        var resolvedValue = null;
        null !== value && (resolvedValue = suffix ? renderStringify(value) + suffix : value);
        return resolvedValue;
    }
    function ɵɵstyling(classBindingNames, styleBindingNames, styleSanitizer) {
        var tNode = getPreviousOrParentTNode();
        tNode.stylingTemplate || (tNode.stylingTemplate = createEmptyStylingContext());
        var directiveStylingIndex = getActiveDirectiveStylingIndex$1();
        if (directiveStylingIndex) {
            runtimeIsNewStylingInUse() && stylingInit();
            allocateOrUpdateDirectiveIntoContext(tNode.stylingTemplate, directiveStylingIndex);
            (tNode.onElementCreationFns = tNode.onElementCreationFns || []).push(function() {
                initStyling(tNode, classBindingNames, styleBindingNames, styleSanitizer, directiveStylingIndex);
                registerHostDirective(tNode.stylingTemplate, directiveStylingIndex);
            });
        } else initStyling(tNode, classBindingNames, styleBindingNames, styleSanitizer, DEFAULT_TEMPLATE_DIRECTIVE_INDEX);
    }
    function initStyling(tNode, classBindingNames, styleBindingNames, styleSanitizer, directiveStylingIndex) {
        updateContextWithBindings(tNode.stylingTemplate, directiveStylingIndex, classBindingNames, styleBindingNames, styleSanitizer);
    }
    function ɵɵstyleProp(styleIndex, value, suffix, forceOverride) {
        var index = getSelectedIndex(), valueToAdd = resolveStylePropValue$1(value, suffix), stylingContext = getStylingContext(index, getLView()), directiveStylingIndex = getActiveDirectiveStylingIndex$1();
        directiveStylingIndex ? enqueueHostInstruction(stylingContext, directiveStylingIndex, updateStyleProp, [ stylingContext, styleIndex, valueToAdd, directiveStylingIndex, forceOverride ]) : updateStyleProp(stylingContext, styleIndex, valueToAdd, DEFAULT_TEMPLATE_DIRECTIVE_INDEX, forceOverride);
        runtimeIsNewStylingInUse() && styleProp(getBindingNameFromIndex(stylingContext, styleIndex, directiveStylingIndex, !1), value, suffix);
    }
    function resolveStylePropValue$1(value, suffix) {
        var valueToAdd = null;
        null !== value && (valueToAdd = suffix ? renderStringify(value) + suffix : value);
        return valueToAdd;
    }
    function ɵɵclassProp(classIndex, value, forceOverride) {
        var index = getSelectedIndex(), input = value instanceof BoundPlayerFactory ? value : booleanOrNull(value), directiveStylingIndex = getActiveDirectiveStylingIndex$1(), stylingContext = getStylingContext(index, getLView());
        directiveStylingIndex ? enqueueHostInstruction(stylingContext, directiveStylingIndex, updateClassProp, [ stylingContext, classIndex, input, directiveStylingIndex, forceOverride ]) : updateClassProp(stylingContext, classIndex, input, DEFAULT_TEMPLATE_DIRECTIVE_INDEX, forceOverride);
        runtimeIsNewStylingInUse() && classProp(getBindingNameFromIndex(stylingContext, classIndex, directiveStylingIndex, !0), input);
    }
    function booleanOrNull(value) {
        return "boolean" == typeof value ? value : !!value || null;
    }
    function ɵɵstyleMap(styles) {
        var index = getSelectedIndex(), lView = getLView(), stylingContext = getStylingContext(index, lView), directiveStylingIndex = getActiveDirectiveStylingIndex$1();
        if (directiveStylingIndex) enqueueHostInstruction(stylingContext, directiveStylingIndex, updateStyleMap, [ stylingContext, styles, directiveStylingIndex ]); else {
            var tNode = getTNode(index, lView);
            if (hasStyleInput(tNode) && styles !== NO_CHANGE) {
                var initialStyles = getInitialClassNameValue(stylingContext), styleInputVal = (initialStyles.length ? initialStyles + " " : "") + forceStylesAsString(styles);
                setInputsForProperty(lView, tNode.inputs.style, styleInputVal);
                styles = NO_CHANGE;
            }
            updateStyleMap(stylingContext, styles);
        }
        runtimeIsNewStylingInUse() && styleMap(styles);
    }
    function ɵɵclassMap(classes) {
        var index = getSelectedIndex(), lView = getLView(), stylingContext = getStylingContext(index, lView), directiveStylingIndex = getActiveDirectiveStylingIndex$1();
        if (directiveStylingIndex) enqueueHostInstruction(stylingContext, directiveStylingIndex, updateClassMap, [ stylingContext, classes, directiveStylingIndex ]); else {
            var tNode = getTNode(index, lView);
            if (hasClassInput(tNode) && classes !== NO_CHANGE) {
                var initialClasses = getInitialClassNameValue(stylingContext), classInputVal = (initialClasses.length ? initialClasses + " " : "") + forceClassesAsString(classes);
                setInputsForProperty(lView, tNode.inputs.class, classInputVal);
                classes = NO_CHANGE;
            }
            updateClassMap(stylingContext, classes);
        }
        runtimeIsNewStylingInUse() && classMap(classes);
    }
    function ɵɵstylingApply() {
        var index = getSelectedIndex(), directiveStylingIndex = getActiveDirectiveStylingIndex$1() || DEFAULT_TEMPLATE_DIRECTIVE_INDEX, lView = getLView(), renderer = 3 === getTNode(index, lView).type ? lView[RENDERER] : null, isFirstRender = 0 != (8 & lView[FLAGS]), stylingContext = getStylingContext(index, lView);
        runtimeAllowOldStyling() && renderStyling(stylingContext, renderer, lView, isFirstRender, null, null, directiveStylingIndex) > 0 && scheduleTick(getRootContext(lView), 2);
        setCachedStylingContext(null);
        runtimeIsNewStylingInUse() && stylingApply();
    }
    function getActiveDirectiveStylingIndex$1() {
        return getActiveDirectiveId() + getActiveDirectiveSuperClassDepth();
    }
    function getStylingContext(index, lView) {
        var context = getCachedStylingContext();
        context || setCachedStylingContext(context = getStylingContextFromLView(index + HEADER_OFFSET, lView));
        return context;
    }
    function ɵɵelementStart(index, name, attrs, localRefs) {
        var lView = getLView(), tView = lView[TVIEW], native = lView[index + HEADER_OFFSET] = elementCreate(name), renderer = lView[RENDERER], tNode = getOrCreateTNode(tView, lView[T_HOST], index, 3, name, attrs || null), initialStylesIndex = 0, initialClassesIndex = 0, lastAttrIndex = -1;
        if (attrs) {
            setNodeStylingTemplate(tView, tNode, attrs, lastAttrIndex = setUpAttributes(native, attrs));
            var stylingTemplate = tNode.stylingTemplate;
            if (stylingTemplate) {
                initialStylesIndex = renderInitialStyles(native, stylingTemplate, renderer);
                initialClassesIndex = renderInitialClasses(native, stylingTemplate, renderer);
            }
        }
        appendChild(native, tNode, lView);
        createDirectivesAndLocals(tView, lView, localRefs);
        0 === getElementDepthCount() && attachPatchData(native, lView);
        increaseElementDepthCount();
        if (tView.firstTemplatePass) {
            var inputData = initializeTNodeInputs(tNode);
            inputData && inputData.hasOwnProperty("class") && (tNode.flags |= 8);
            inputData && inputData.hasOwnProperty("style") && (tNode.flags |= 16);
        }
        if (tNode.stylingTemplate) {
            renderInitialClasses(native, tNode.stylingTemplate, renderer, initialClassesIndex);
            renderInitialStyles(native, tNode.stylingTemplate, renderer, initialStylesIndex);
        }
        runtimeIsNewStylingInUse() && lastAttrIndex >= 0 && registerInitialStylingIntoContext(tNode, attrs, lastAttrIndex);
        var currentQueries = lView[QUERIES];
        if (currentQueries) {
            currentQueries.addNode(tNode);
            lView[QUERIES] = currentQueries.clone(tNode);
        }
        executeContentQueries(tView, tNode, lView);
    }
    function ɵɵelementEnd() {
        var previousOrParentTNode = getPreviousOrParentTNode();
        getIsParent() ? setIsNotParent() : setPreviousOrParentTNode(previousOrParentTNode = previousOrParentTNode.parent, !1);
        previousOrParentTNode.onElementCreationFns && applyOnCreateInstructions(previousOrParentTNode);
        var lView = getLView(), currentQueries = lView[QUERIES];
        currentQueries && previousOrParentTNode.index === currentQueries.nodeIndex && (lView[QUERIES] = currentQueries.parent);
        registerPostOrderHooks(getLView()[TVIEW], previousOrParentTNode);
        decreaseElementDepthCount();
        var stylingContext = null;
        if (hasClassInput(previousOrParentTNode)) {
            stylingContext = getStylingContextFromLView(previousOrParentTNode.index, lView);
            setInputsForProperty(lView, previousOrParentTNode.inputs.class, getInitialClassNameValue(stylingContext));
        }
        if (hasStyleInput(previousOrParentTNode)) {
            stylingContext = stylingContext || getStylingContextFromLView(previousOrParentTNode.index, lView);
            setInputsForProperty(lView, previousOrParentTNode.inputs.style, getInitialStyleStringValue(stylingContext));
        }
    }
    function ɵɵelement(index, name, attrs, localRefs) {
        ɵɵelementStart(index, name, attrs, localRefs);
        ɵɵelementEnd();
    }
    function ɵɵelementAttribute(index, name, value, sanitizer, namespace) {
        if (value !== NO_CHANGE) {
            var lView_3 = getLView();
            elementAttributeInternal(index, name, value, lView_3, lView_3[RENDERER], sanitizer, namespace);
        }
    }
    function elementAttributeInternal(index, name, value, lView, renderer, sanitizer, namespace) {
        var element = getNativeByIndex(index, lView);
        if (null == value) isProceduralRenderer(renderer) ? renderer.removeAttribute(element, name, namespace) : element.removeAttribute(name); else {
            var tNode = getTNode(index, lView), strValue = null == sanitizer ? renderStringify(value) : sanitizer(value, tNode.tagName || "", name);
            isProceduralRenderer(renderer) ? renderer.setAttribute(element, name, strValue, namespace) : namespace ? element.setAttributeNS(namespace, name, strValue) : element.setAttribute(name, strValue);
        }
    }
    function ɵɵelementHostAttrs(attrs) {
        var hostElementIndex = getSelectedIndex(), lView = getLView(), tNode = getTNode(hostElementIndex, lView);
        if (3 === tNode.type) {
            var stylingAttrsStartIndex = attrsStylingIndexOf(attrs, setUpAttributes(getNativeByTNode(tNode, lView), attrs));
            if (stylingAttrsStartIndex >= 0) {
                var directiveStylingIndex = getActiveDirectiveStylingIndex$1();
                tNode.stylingTemplate ? patchContextWithStaticAttrs(tNode.stylingTemplate, attrs, stylingAttrsStartIndex, directiveStylingIndex) : tNode.stylingTemplate = initializeStaticContext(attrs, stylingAttrsStartIndex, directiveStylingIndex);
            }
        }
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    var _symbolIterator = null;
    function getSymbolIterator() {
        if (!_symbolIterator) {
            var Symbol_1 = _global.Symbol;
            if (Symbol_1 && Symbol_1.iterator) _symbolIterator = Symbol_1.iterator; else for (var keys = Object.getOwnPropertyNames(Map.prototype), i = 0; i < keys.length; ++i) {
                var key = keys[i];
                "entries" !== key && "size" !== key && Map.prototype[key] === Map.prototype.entries && (_symbolIterator = key);
            }
        }
        return _symbolIterator;
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    function looseIdentical(a, b) {
        return a === b || "number" == typeof a && "number" == typeof b && isNaN(a) && isNaN(b);
    }
    var WrappedValue = function() {
        function WrappedValue(value) {
            this.wrapped = value;
        }
        WrappedValue.wrap = function(value) {
            return new WrappedValue(value);
        };
        WrappedValue.unwrap = function(value) {
            return WrappedValue.isWrapped(value) ? value.wrapped : value;
        };
        WrappedValue.isWrapped = function(value) {
            return value instanceof WrappedValue;
        };
        return WrappedValue;
    }();
    function isListLikeIterable(obj) {
        return !!isJsObject(obj) && (Array.isArray(obj) || !(obj instanceof Map) && getSymbolIterator() in obj);
    }
    function iterateListLike(obj, fn) {
        if (Array.isArray(obj)) for (var i = 0; i < obj.length; i++) fn(obj[i]); else for (var iterator_1 = obj[getSymbolIterator()](), item = void 0; !(item = iterator_1.next()).done; ) fn(item.value);
    }
    function isJsObject(o) {
        return null !== o && ("function" == typeof o || "object" == typeof o);
    }
    function updateBinding(lView, bindingIndex, value) {
        return lView[bindingIndex] = value;
    }
    function getBinding(lView, bindingIndex) {
        return lView[bindingIndex];
    }
    function bindingUpdated(lView, bindingIndex, value) {
        if (isDifferent(lView[bindingIndex], value)) {
            lView[bindingIndex] = value;
            return !0;
        }
        return !1;
    }
    function bindingUpdated2(lView, bindingIndex, exp1, exp2) {
        var different = bindingUpdated(lView, bindingIndex, exp1);
        return bindingUpdated(lView, bindingIndex + 1, exp2) || different;
    }
    function bindingUpdated3(lView, bindingIndex, exp1, exp2, exp3) {
        var different = bindingUpdated2(lView, bindingIndex, exp1, exp2);
        return bindingUpdated(lView, bindingIndex + 2, exp3) || different;
    }
    function bindingUpdated4(lView, bindingIndex, exp1, exp2, exp3, exp4) {
        var different = bindingUpdated2(lView, bindingIndex, exp1, exp2);
        return bindingUpdated2(lView, bindingIndex + 2, exp3, exp4) || different;
    }
    function ɵɵproperty(propName, value, sanitizer, nativeOnly) {
        var index = getSelectedIndex(), bindReconciledValue = ɵɵbind(value);
        bindReconciledValue !== NO_CHANGE && elementPropertyInternal(index, propName, bindReconciledValue, sanitizer, nativeOnly);
        return ɵɵproperty;
    }
    function ɵɵbind(value) {
        var lView = getLView(), bindingIndex = lView[BINDING_INDEX]++;
        storeBindingMetadata(lView);
        return bindingUpdated(lView, bindingIndex, value) ? value : NO_CHANGE;
    }
    function ɵɵupdateSyntheticHostBinding(propName, value, sanitizer, nativeOnly) {
        var index = getSelectedIndex(), bound = ɵɵbind(value);
        bound !== NO_CHANGE && elementPropertyInternal(index, propName, bound, sanitizer, nativeOnly, loadComponentRenderer);
    }
    function ɵɵattribute(name, value, sanitizer, namespace) {
        return ɵɵelementAttribute(getSelectedIndex(), name, ɵɵbind(value), sanitizer, namespace);
    }
    function ɵɵinterpolationV(values) {
        var isBindingUpdated = !1, lView = getLView(), tData = lView[TVIEW].data, bindingIndex = lView[BINDING_INDEX];
        if (null == tData[bindingIndex]) {
            for (var i = 2; i < values.length; i += 2) tData[bindingIndex++] = values[i];
            bindingIndex = lView[BINDING_INDEX];
        }
        for (i = 1; i < values.length; i += 2) isBindingUpdated = bindingUpdated(lView, bindingIndex++, values[i]) || isBindingUpdated;
        lView[BINDING_INDEX] = bindingIndex;
        storeBindingMetadata(lView, values[0], values[values.length - 1]);
        if (!isBindingUpdated) return NO_CHANGE;
        var content = values[0];
        for (i = 1; i < values.length; i += 2) content += renderStringify(values[i]) + values[i + 1];
        return content;
    }
    function ɵɵinterpolation1(prefix, v0, suffix) {
        var lView = getLView(), different = bindingUpdated(lView, lView[BINDING_INDEX]++, v0);
        storeBindingMetadata(lView, prefix, suffix);
        return different ? prefix + renderStringify(v0) + suffix : NO_CHANGE;
    }
    function ɵɵinterpolation2(prefix, v0, i0, v1, suffix) {
        var lView = getLView(), bindingIndex = lView[BINDING_INDEX], different = bindingUpdated2(lView, bindingIndex, v0, v1);
        lView[BINDING_INDEX] += 2;
        storeBindingMetadata(lView, prefix, suffix) && (lView[TVIEW].data[bindingIndex] = i0);
        return different ? prefix + renderStringify(v0) + i0 + renderStringify(v1) + suffix : NO_CHANGE;
    }
    function ɵɵinterpolation3(prefix, v0, i0, v1, i1, v2, suffix) {
        var lView = getLView(), bindingIndex = lView[BINDING_INDEX], different = bindingUpdated3(lView, bindingIndex, v0, v1, v2);
        lView[BINDING_INDEX] += 3;
        if (storeBindingMetadata(lView, prefix, suffix)) {
            var tData = lView[TVIEW].data;
            tData[bindingIndex] = i0;
            tData[bindingIndex + 1] = i1;
        }
        return different ? prefix + renderStringify(v0) + i0 + renderStringify(v1) + i1 + renderStringify(v2) + suffix : NO_CHANGE;
    }
    function ɵɵinterpolation4(prefix, v0, i0, v1, i1, v2, i2, v3, suffix) {
        var lView = getLView(), bindingIndex = lView[BINDING_INDEX], different = bindingUpdated4(lView, bindingIndex, v0, v1, v2, v3);
        lView[BINDING_INDEX] += 4;
        if (storeBindingMetadata(lView, prefix, suffix)) {
            var tData = lView[TVIEW].data;
            tData[bindingIndex] = i0;
            tData[bindingIndex + 1] = i1;
            tData[bindingIndex + 2] = i2;
        }
        return different ? prefix + renderStringify(v0) + i0 + renderStringify(v1) + i1 + renderStringify(v2) + i2 + renderStringify(v3) + suffix : NO_CHANGE;
    }
    function ɵɵinterpolation5(prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, suffix) {
        var lView = getLView(), bindingIndex = lView[BINDING_INDEX], different = bindingUpdated4(lView, bindingIndex, v0, v1, v2, v3);
        different = bindingUpdated(lView, bindingIndex + 4, v4) || different;
        lView[BINDING_INDEX] += 5;
        if (storeBindingMetadata(lView, prefix, suffix)) {
            var tData = lView[TVIEW].data;
            tData[bindingIndex] = i0;
            tData[bindingIndex + 1] = i1;
            tData[bindingIndex + 2] = i2;
            tData[bindingIndex + 3] = i3;
        }
        return different ? prefix + renderStringify(v0) + i0 + renderStringify(v1) + i1 + renderStringify(v2) + i2 + renderStringify(v3) + i3 + renderStringify(v4) + suffix : NO_CHANGE;
    }
    function ɵɵinterpolation6(prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, suffix) {
        var lView = getLView(), bindingIndex = lView[BINDING_INDEX], different = bindingUpdated4(lView, bindingIndex, v0, v1, v2, v3);
        different = bindingUpdated2(lView, bindingIndex + 4, v4, v5) || different;
        lView[BINDING_INDEX] += 6;
        if (storeBindingMetadata(lView, prefix, suffix)) {
            var tData = lView[TVIEW].data;
            tData[bindingIndex] = i0;
            tData[bindingIndex + 1] = i1;
            tData[bindingIndex + 2] = i2;
            tData[bindingIndex + 3] = i3;
            tData[bindingIndex + 4] = i4;
        }
        return different ? prefix + renderStringify(v0) + i0 + renderStringify(v1) + i1 + renderStringify(v2) + i2 + renderStringify(v3) + i3 + renderStringify(v4) + i4 + renderStringify(v5) + suffix : NO_CHANGE;
    }
    function ɵɵinterpolation7(prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, suffix) {
        var lView = getLView(), bindingIndex = lView[BINDING_INDEX], different = bindingUpdated4(lView, bindingIndex, v0, v1, v2, v3);
        different = bindingUpdated3(lView, bindingIndex + 4, v4, v5, v6) || different;
        lView[BINDING_INDEX] += 7;
        if (storeBindingMetadata(lView, prefix, suffix)) {
            var tData = lView[TVIEW].data;
            tData[bindingIndex] = i0;
            tData[bindingIndex + 1] = i1;
            tData[bindingIndex + 2] = i2;
            tData[bindingIndex + 3] = i3;
            tData[bindingIndex + 4] = i4;
            tData[bindingIndex + 5] = i5;
        }
        return different ? prefix + renderStringify(v0) + i0 + renderStringify(v1) + i1 + renderStringify(v2) + i2 + renderStringify(v3) + i3 + renderStringify(v4) + i4 + renderStringify(v5) + i5 + renderStringify(v6) + suffix : NO_CHANGE;
    }
    function ɵɵinterpolation8(prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, i6, v7, suffix) {
        var lView = getLView(), bindingIndex = lView[BINDING_INDEX], different = bindingUpdated4(lView, bindingIndex, v0, v1, v2, v3);
        different = bindingUpdated4(lView, bindingIndex + 4, v4, v5, v6, v7) || different;
        lView[BINDING_INDEX] += 8;
        if (storeBindingMetadata(lView, prefix, suffix)) {
            var tData = lView[TVIEW].data;
            tData[bindingIndex] = i0;
            tData[bindingIndex + 1] = i1;
            tData[bindingIndex + 2] = i2;
            tData[bindingIndex + 3] = i3;
            tData[bindingIndex + 4] = i4;
            tData[bindingIndex + 5] = i5;
            tData[bindingIndex + 6] = i6;
        }
        return different ? prefix + renderStringify(v0) + i0 + renderStringify(v1) + i1 + renderStringify(v2) + i2 + renderStringify(v3) + i3 + renderStringify(v4) + i4 + renderStringify(v5) + i5 + renderStringify(v6) + i6 + renderStringify(v7) + suffix : NO_CHANGE;
    }
    function ɵɵattributeInterpolate1(attrName, prefix, v0, suffix, sanitizer, namespace) {
        ɵɵelementAttribute(getSelectedIndex(), attrName, ɵɵinterpolation1(prefix, v0, suffix), sanitizer, namespace);
        return ɵɵattributeInterpolate1;
    }
    function ɵɵattributeInterpolate2(attrName, prefix, v0, i0, v1, suffix, sanitizer, namespace) {
        ɵɵelementAttribute(getSelectedIndex(), attrName, ɵɵinterpolation2(prefix, v0, i0, v1, suffix), sanitizer, namespace);
        return ɵɵattributeInterpolate2;
    }
    function ɵɵattributeInterpolate3(attrName, prefix, v0, i0, v1, i1, v2, suffix, sanitizer, namespace) {
        ɵɵelementAttribute(getSelectedIndex(), attrName, ɵɵinterpolation3(prefix, v0, i0, v1, i1, v2, suffix), sanitizer, namespace);
        return ɵɵattributeInterpolate3;
    }
    function ɵɵattributeInterpolate4(attrName, prefix, v0, i0, v1, i1, v2, i2, v3, suffix, sanitizer, namespace) {
        ɵɵelementAttribute(getSelectedIndex(), attrName, ɵɵinterpolation4(prefix, v0, i0, v1, i1, v2, i2, v3, suffix), sanitizer, namespace);
        return ɵɵattributeInterpolate4;
    }
    function ɵɵattributeInterpolate5(attrName, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, suffix, sanitizer, namespace) {
        ɵɵelementAttribute(getSelectedIndex(), attrName, ɵɵinterpolation5(prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, suffix), sanitizer, namespace);
        return ɵɵattributeInterpolate5;
    }
    function ɵɵattributeInterpolate6(attrName, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, suffix, sanitizer, namespace) {
        ɵɵelementAttribute(getSelectedIndex(), attrName, ɵɵinterpolation6(prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, suffix), sanitizer, namespace);
        return ɵɵattributeInterpolate6;
    }
    function ɵɵattributeInterpolate7(attrName, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, suffix, sanitizer, namespace) {
        ɵɵelementAttribute(getSelectedIndex(), attrName, ɵɵinterpolation7(prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, suffix), sanitizer, namespace);
        return ɵɵattributeInterpolate7;
    }
    function ɵɵattributeInterpolate8(attrName, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, i6, v7, suffix, sanitizer, namespace) {
        ɵɵelementAttribute(getSelectedIndex(), attrName, ɵɵinterpolation8(prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, i6, v7, suffix), sanitizer, namespace);
        return ɵɵattributeInterpolate8;
    }
    function ɵɵattributeInterpolateV(attrName, values, sanitizer, namespace) {
        ɵɵelementAttribute(getSelectedIndex(), attrName, ɵɵinterpolationV(values), sanitizer, namespace);
        return ɵɵattributeInterpolateV;
    }
    function ɵɵcontainer(index) {
        var tNode = containerInternal(index, null, null), lView = getLView();
        lView[TVIEW].firstTemplatePass && (tNode.tViews = []);
        addTContainerToQueries(lView, tNode);
        setIsNotParent();
    }
    function ɵɵtemplate(index, templateFn, consts, vars, tagName, attrs, localRefs, localRefExtractor) {
        var lView = getLView(), tView = lView[TVIEW], tContainerNode = containerInternal(index, tagName || null, attrs || null);
        tView.firstTemplatePass && (tContainerNode.tViews = createTView(-1, templateFn, consts, vars, tView.directiveRegistry, tView.pipeRegistry, null, null));
        createDirectivesAndLocals(tView, lView, localRefs, localRefExtractor);
        addTContainerToQueries(lView, tContainerNode);
        attachPatchData(getNativeByTNode(tContainerNode, lView), lView);
        registerPostOrderHooks(tView, tContainerNode);
        setIsNotParent();
    }
    function ɵɵcontainerRefreshStart(index) {
        var lView = getLView(), tView = lView[TVIEW];
        setPreviousOrParentTNode(loadInternal(tView.data, index), !0);
        lView[index + HEADER_OFFSET][ACTIVE_INDEX] = 0;
        executePreOrderHooks(lView, tView, getCheckNoChangesMode(), void 0);
    }
    function ɵɵcontainerRefreshEnd() {
        var previousOrParentTNode = getPreviousOrParentTNode();
        getIsParent() ? setIsNotParent() : setPreviousOrParentTNode(previousOrParentTNode = previousOrParentTNode.parent, !1);
        for (var lContainer = getLView()[previousOrParentTNode.index], nextIndex = lContainer[ACTIVE_INDEX]; nextIndex < lContainer.length - CONTAINER_HEADER_OFFSET; ) removeView(lContainer, nextIndex);
    }
    function addTContainerToQueries(lView, tContainerNode) {
        var queries = lView[QUERIES];
        if (queries) {
            var lContainer = lView[tContainerNode.index];
            if (lContainer[QUERIES]) queries.insertNodeBeforeViews(tContainerNode); else {
                queries.addNode(tContainerNode);
                lContainer[QUERIES] = queries.container();
            }
        }
    }
    function containerInternal(index, tagName, attrs) {
        var lView = getLView(), adjustedIndex = index + HEADER_OFFSET, comment = lView[index + HEADER_OFFSET] = lView[RENDERER].createComment(""), tNode = getOrCreateTNode(lView[TVIEW], lView[T_HOST], index, 0, tagName, attrs), lContainer = lView[adjustedIndex] = createLContainer(lView[adjustedIndex], lView, comment, tNode);
        appendChild(comment, tNode, lView);
        addToViewTree(lView, lContainer);
        return tNode;
    }
    function store(index, value) {
        var lView = getLView(), tView = lView[TVIEW], adjustedIndex = index + HEADER_OFFSET;
        if (adjustedIndex >= tView.data.length) {
            tView.data[adjustedIndex] = null;
            tView.blueprint[adjustedIndex] = null;
        }
        lView[adjustedIndex] = value;
    }
    function ɵɵreference(index) {
        return loadInternal(getContextLView(), index);
    }
    function ɵɵload(index) {
        return loadInternal(getLView(), index);
    }
    function ɵɵdirectiveInject(token, flags) {
        void 0 === flags && (flags = InjectFlags.Default);
        token = resolveForwardRef(token);
        var lView = getLView();
        return null == lView ? ɵɵinject(token, flags) : getOrCreateInjectable(getPreviousOrParentTNode(), lView, token, flags);
    }
    function ɵɵinjectAttribute(attrNameToInject) {
        return injectAttributeImpl(getPreviousOrParentTNode(), attrNameToInject);
    }
    function ɵɵelementContainerStart(index, attrs, localRefs) {
        var lView = getLView(), tView = lView[TVIEW], tagName = "ng-container", native = lView[index + HEADER_OFFSET] = lView[RENDERER].createComment(""), tNode = getOrCreateTNode(tView, lView[T_HOST], index, 4, tagName, attrs || null);
        attrs && setNodeStylingTemplate(tView, tNode, attrs, 0);
        appendChild(native, tNode, lView);
        createDirectivesAndLocals(tView, lView, localRefs);
        attachPatchData(native, lView);
        var currentQueries = lView[QUERIES];
        if (currentQueries) {
            currentQueries.addNode(tNode);
            lView[QUERIES] = currentQueries.clone(tNode);
        }
        executeContentQueries(tView, tNode, lView);
    }
    function ɵɵelementContainerEnd() {
        var previousOrParentTNode = getPreviousOrParentTNode(), lView = getLView(), tView = lView[TVIEW];
        getIsParent() ? setIsNotParent() : setPreviousOrParentTNode(previousOrParentTNode = previousOrParentTNode.parent, !1);
        var currentQueries = lView[QUERIES];
        currentQueries && previousOrParentTNode.index === currentQueries.nodeIndex && (lView[QUERIES] = currentQueries.parent);
        previousOrParentTNode.onElementCreationFns && applyOnCreateInstructions(previousOrParentTNode);
        registerPostOrderHooks(tView, previousOrParentTNode);
    }
    function ɵɵembeddedViewStart(viewBlockId, consts, vars) {
        var lView = getLView(), previousOrParentTNode = getPreviousOrParentTNode(), containerTNode = 2 === previousOrParentTNode.type ? previousOrParentTNode.parent : previousOrParentTNode, lContainer = lView[containerTNode.index], viewToRender = scanForView(lContainer, lContainer[ACTIVE_INDEX], viewBlockId);
        if (viewToRender) {
            setIsParent();
            enterView(viewToRender, viewToRender[TVIEW].node);
        } else {
            viewToRender = createLView(lView, getOrCreateEmbeddedTView(viewBlockId, consts, vars, containerTNode), null, 16, null, null);
            lContainer[QUERIES] && (viewToRender[QUERIES] = lContainer[QUERIES].createView());
            var tParentNode = getIsParent() ? previousOrParentTNode : previousOrParentTNode && previousOrParentTNode.parent;
            assignTViewNodeToLView(viewToRender[TVIEW], tParentNode, viewBlockId, viewToRender);
            enterView(viewToRender, viewToRender[TVIEW].node);
        }
        if (lContainer) {
            isCreationMode(viewToRender) && insertView(viewToRender, lContainer, lContainer[ACTIVE_INDEX]);
            lContainer[ACTIVE_INDEX]++;
        }
        return isCreationMode(viewToRender) ? 3 : 2;
    }
    function getOrCreateEmbeddedTView(viewIndex, consts, vars, parent) {
        var tView = getLView()[TVIEW], containerTViews = parent.tViews;
        (viewIndex >= containerTViews.length || null == containerTViews[viewIndex]) && (containerTViews[viewIndex] = createTView(viewIndex, null, consts, vars, tView.directiveRegistry, tView.pipeRegistry, null, null));
        return containerTViews[viewIndex];
    }
    function scanForView(lContainer, startIdx, viewBlockId) {
        for (var i = startIdx + CONTAINER_HEADER_OFFSET; i < lContainer.length; i++) {
            var viewAtPositionId = lContainer[i][TVIEW].id;
            if (viewAtPositionId === viewBlockId) return lContainer[i];
            if (!(viewAtPositionId < viewBlockId)) break;
            removeView(lContainer, i - CONTAINER_HEADER_OFFSET);
        }
        return null;
    }
    function ɵɵembeddedViewEnd() {
        var lView = getLView(), viewHost = lView[T_HOST];
        if (isCreationMode(lView)) {
            refreshDescendantViews(lView);
            lView[FLAGS] &= -5;
        }
        resetPreOrderHookFlags(lView);
        refreshDescendantViews(lView);
        leaveView(lView[PARENT][PARENT]);
        setPreviousOrParentTNode(viewHost, !1);
    }
    function ɵɵgetCurrentView() {
        return getLView();
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    function isPromise(obj) {
        return !!obj && "function" == typeof obj.then;
    }
    function ɵɵlistener(eventName, listenerFn, useCapture, eventTargetResolver) {
        void 0 === useCapture && (useCapture = !1);
        listenerInternal(eventName, listenerFn, useCapture, eventTargetResolver);
    }
    function ɵɵcomponentHostSyntheticListener(eventName, listenerFn, useCapture, eventTargetResolver) {
        void 0 === useCapture && (useCapture = !1);
        listenerInternal(eventName, listenerFn, useCapture, eventTargetResolver, loadComponentRenderer);
    }
    function findExistingListener(lView, eventName, tNodeIdx) {
        var tCleanup = lView[TVIEW].cleanup;
        if (null != tCleanup) for (var i = 0; i < tCleanup.length - 1; i += 2) {
            var cleanupEventName = tCleanup[i];
            if (cleanupEventName === eventName && tCleanup[i + 1] === tNodeIdx) {
                var lCleanup = lView[CLEANUP], listenerIdxInLCleanup = tCleanup[i + 2];
                return lCleanup.length > listenerIdxInLCleanup ? lCleanup[listenerIdxInLCleanup] : null;
            }
            "string" == typeof cleanupEventName && (i += 2);
        }
        return null;
    }
    function listenerInternal(eventName, listenerFn, useCapture, eventTargetResolver, loadRendererFn) {
        void 0 === useCapture && (useCapture = !1);
        var lView = getLView(), tNode = getPreviousOrParentTNode(), tView = lView[TVIEW], tCleanup = tView.firstTemplatePass && (tView.cleanup || (tView.cleanup = [])), processOutputs = !0;
        if (3 === tNode.type) {
            var native = getNativeByTNode(tNode, lView), resolved = eventTargetResolver ? eventTargetResolver(native) : EMPTY_OBJ, target = resolved.target || native, renderer = loadRendererFn ? loadRendererFn(tNode, lView) : lView[RENDERER], lCleanupIndex = (lCleanup = getCleanup(lView)).length, idxOrTargetGetter = eventTargetResolver ? function(_lView) {
                return eventTargetResolver(unwrapRNode(_lView[tNode.index])).target;
            } : tNode.index;
            if (isProceduralRenderer(renderer)) {
                var existingListener = null;
                !eventTargetResolver && hasDirectives(tNode) && (existingListener = findExistingListener(lView, eventName, tNode.index));
                if (null !== existingListener) {
                    listenerFn.__ngNextListenerFn__ = existingListener.__ngNextListenerFn__;
                    existingListener.__ngNextListenerFn__ = listenerFn;
                    processOutputs = !1;
                } else {
                    listenerFn = wrapListener(tNode, lView, listenerFn, !1);
                    var cleanupFn = renderer.listen(resolved.name || target, eventName, listenerFn);
                    lCleanup.push(listenerFn, cleanupFn);
                    tCleanup && tCleanup.push(eventName, idxOrTargetGetter, lCleanupIndex, lCleanupIndex + 1);
                }
            } else {
                listenerFn = wrapListener(tNode, lView, listenerFn, !0);
                target.addEventListener(eventName, listenerFn, useCapture);
                lCleanup.push(listenerFn);
                tCleanup && tCleanup.push(eventName, idxOrTargetGetter, lCleanupIndex, useCapture);
            }
        }
        void 0 === tNode.outputs && (tNode.outputs = generatePropertyAliases(tNode, 1));
        var props, outputs = tNode.outputs;
        if (processOutputs && outputs && (props = outputs[eventName])) {
            var propsLength = props.length;
            if (propsLength) for (var lCleanup = getCleanup(lView), i = 0; i < propsLength; i += 3) {
                var subscription = lView[props[i]][props[i + 2]].subscribe(listenerFn), idx = lCleanup.length;
                lCleanup.push(listenerFn, subscription);
                tCleanup && tCleanup.push(eventName, tNode.index, idx, -(idx + 1));
            }
        }
    }
    function executeListenerWithErrorHandling(lView, listenerFn, e) {
        try {
            return !1 !== listenerFn(e);
        } catch (error) {
            handleError(lView, error);
            return !1;
        }
    }
    function wrapListener(tNode, lView, listenerFn, wrapWithPreventDefault) {
        return function wrapListenerIn_markDirtyAndPreventDefault(e) {
            var startView = 1 & tNode.flags ? getComponentViewByIndex(tNode.index, lView) : lView;
            0 == (32 & lView[FLAGS]) && markViewDirty(startView);
            for (var result = executeListenerWithErrorHandling(lView, listenerFn, e), nextListenerFn = wrapListenerIn_markDirtyAndPreventDefault.__ngNextListenerFn__; nextListenerFn; ) {
                result = executeListenerWithErrorHandling(lView, nextListenerFn, e) && result;
                nextListenerFn = nextListenerFn.__ngNextListenerFn__;
            }
            if (wrapWithPreventDefault && !1 === result) {
                e.preventDefault();
                e.returnValue = !1;
            }
            return result;
        };
    }
    function ɵɵnextContext(level) {
        void 0 === level && (level = 1);
        return nextContextImpl(level);
    }
    function matchingProjectionSlotIndex(tNode, projectionSlots) {
        for (var wildcardNgContentIndex = null, ngProjectAsAttrVal = getProjectAsAttrValue(tNode), i = 0; i < projectionSlots.length; i++) {
            var slotValue = projectionSlots[i];
            if ("*" !== slotValue) {
                if (null === ngProjectAsAttrVal ? isNodeMatchingSelectorList(tNode, slotValue, !0) : isSelectorInSelectorList(ngProjectAsAttrVal, slotValue)) return i;
            } else wildcardNgContentIndex = i;
        }
        return wildcardNgContentIndex;
    }
    function ɵɵprojectionDef(projectionSlots) {
        var componentNode = findComponentView(getLView())[T_HOST];
        if (!componentNode.projection) for (var projectionHeads = componentNode.projection = new Array(projectionSlots ? projectionSlots.length : 1).fill(null), tails = projectionHeads.slice(), componentChild = componentNode.child; null !== componentChild; ) {
            var slotIndex = projectionSlots ? matchingProjectionSlotIndex(componentChild, projectionSlots) : 0;
            if (null !== slotIndex) {
                tails[slotIndex] ? tails[slotIndex].projectionNext = componentChild : projectionHeads[slotIndex] = componentChild;
                tails[slotIndex] = componentChild;
            }
            componentChild = componentChild.next;
        }
    }
    var delayProjection = !1;
    function setDelayProjection(value) {
        delayProjection = value;
    }
    function ɵɵprojection(nodeIndex, selectorIndex, attrs) {
        void 0 === selectorIndex && (selectorIndex = 0);
        var lView = getLView(), tProjectionNode = getOrCreateTNode(lView[TVIEW], lView[T_HOST], nodeIndex, 1, null, attrs || null);
        null === tProjectionNode.projection && (tProjectionNode.projection = selectorIndex);
        setIsNotParent();
        delayProjection || appendProjectedNodes(lView, tProjectionNode, selectorIndex, findComponentView(lView));
    }
    function ɵɵpropertyInterpolate(propName, v0, sanitizer) {
        ɵɵpropertyInterpolate1(propName, "", v0, "", sanitizer);
        return ɵɵpropertyInterpolate;
    }
    function ɵɵpropertyInterpolate1(propName, prefix, v0, suffix, sanitizer) {
        var index = getSelectedIndex(), interpolatedValue = ɵɵinterpolation1(prefix, v0, suffix);
        interpolatedValue !== NO_CHANGE && elementPropertyInternal(index, propName, interpolatedValue, sanitizer);
        return ɵɵpropertyInterpolate1;
    }
    function ɵɵpropertyInterpolate2(propName, prefix, v0, i0, v1, suffix, sanitizer) {
        var index = getSelectedIndex(), interpolatedValue = ɵɵinterpolation2(prefix, v0, i0, v1, suffix);
        interpolatedValue !== NO_CHANGE && elementPropertyInternal(index, propName, interpolatedValue, sanitizer);
        return ɵɵpropertyInterpolate2;
    }
    function ɵɵpropertyInterpolate3(propName, prefix, v0, i0, v1, i1, v2, suffix, sanitizer) {
        var index = getSelectedIndex(), interpolatedValue = ɵɵinterpolation3(prefix, v0, i0, v1, i1, v2, suffix);
        interpolatedValue !== NO_CHANGE && elementPropertyInternal(index, propName, interpolatedValue, sanitizer);
        return ɵɵpropertyInterpolate3;
    }
    function ɵɵpropertyInterpolate4(propName, prefix, v0, i0, v1, i1, v2, i2, v3, suffix, sanitizer) {
        var index = getSelectedIndex(), interpolatedValue = ɵɵinterpolation4(prefix, v0, i0, v1, i1, v2, i2, v3, suffix);
        interpolatedValue !== NO_CHANGE && elementPropertyInternal(index, propName, interpolatedValue, sanitizer);
        return ɵɵpropertyInterpolate4;
    }
    function ɵɵpropertyInterpolate5(propName, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, suffix, sanitizer) {
        var index = getSelectedIndex(), interpolatedValue = ɵɵinterpolation5(prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, suffix);
        interpolatedValue !== NO_CHANGE && elementPropertyInternal(index, propName, interpolatedValue, sanitizer);
        return ɵɵpropertyInterpolate5;
    }
    function ɵɵpropertyInterpolate6(propName, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, suffix, sanitizer) {
        var index = getSelectedIndex(), interpolatedValue = ɵɵinterpolation6(prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, suffix);
        interpolatedValue !== NO_CHANGE && elementPropertyInternal(index, propName, interpolatedValue, sanitizer);
        return ɵɵpropertyInterpolate6;
    }
    function ɵɵpropertyInterpolate7(propName, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, suffix, sanitizer) {
        var index = getSelectedIndex(), interpolatedValue = ɵɵinterpolation7(prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, suffix);
        interpolatedValue !== NO_CHANGE && elementPropertyInternal(index, propName, interpolatedValue, sanitizer);
        return ɵɵpropertyInterpolate7;
    }
    function ɵɵpropertyInterpolate8(propName, prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, i6, v7, suffix, sanitizer) {
        var index = getSelectedIndex(), interpolatedValue = ɵɵinterpolation8(prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, i6, v7, suffix);
        interpolatedValue !== NO_CHANGE && elementPropertyInternal(index, propName, interpolatedValue, sanitizer);
        return ɵɵpropertyInterpolate8;
    }
    function ɵɵpropertyInterpolateV(propName, values, sanitizer) {
        var index = getSelectedIndex(), interpolatedValue = ɵɵinterpolationV(values);
        interpolatedValue !== NO_CHANGE && elementPropertyInternal(index, propName, interpolatedValue, sanitizer);
        return ɵɵpropertyInterpolateV;
    }
    function ɵɵselect(index) {
        var lView = getLView();
        executePreOrderHooks(lView, lView[TVIEW], getCheckNoChangesMode(), index);
        setSelectedIndex(index);
    }
    function ɵɵtext(index, value) {
        var lView = getLView(), textNative = lView[index + HEADER_OFFSET] = createTextNode(value, lView[RENDERER]), tNode = getOrCreateTNode(lView[TVIEW], lView[T_HOST], index, 3, null, null);
        setIsNotParent();
        appendChild(textNative, tNode, lView);
    }
    function ɵɵtextBinding(index, value) {
        if (value !== NO_CHANGE) {
            var lView_4 = getLView(), element = getNativeByIndex(index, lView_4), renderer = lView_4[RENDERER];
            isProceduralRenderer(renderer) ? renderer.setValue(element, renderStringify(value)) : element.textContent = renderStringify(value);
        }
    }
    function ɵɵtextInterpolate(v0) {
        ɵɵtextInterpolate1("", v0, "");
        return ɵɵtextInterpolate;
    }
    function ɵɵtextInterpolate1(prefix, v0, suffix) {
        ɵɵtextBinding(getSelectedIndex(), ɵɵinterpolation1(prefix, v0, suffix));
        return ɵɵtextInterpolate1;
    }
    function ɵɵtextInterpolate2(prefix, v0, i0, v1, suffix) {
        ɵɵtextBinding(getSelectedIndex(), ɵɵinterpolation2(prefix, v0, i0, v1, suffix));
        return ɵɵtextInterpolate2;
    }
    function ɵɵtextInterpolate3(prefix, v0, i0, v1, i1, v2, suffix) {
        ɵɵtextBinding(getSelectedIndex(), ɵɵinterpolation3(prefix, v0, i0, v1, i1, v2, suffix));
        return ɵɵtextInterpolate3;
    }
    function ɵɵtextInterpolate4(prefix, v0, i0, v1, i1, v2, i2, v3, suffix) {
        ɵɵtextBinding(getSelectedIndex(), ɵɵinterpolation4(prefix, v0, i0, v1, i1, v2, i2, v3, suffix));
        return ɵɵtextInterpolate4;
    }
    function ɵɵtextInterpolate5(prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, suffix) {
        ɵɵtextBinding(getSelectedIndex(), ɵɵinterpolation5(prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, suffix));
        return ɵɵtextInterpolate5;
    }
    function ɵɵtextInterpolate6(prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, suffix) {
        ɵɵtextBinding(getSelectedIndex(), ɵɵinterpolation6(prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, suffix));
        return ɵɵtextInterpolate6;
    }
    function ɵɵtextInterpolate7(prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, suffix) {
        ɵɵtextBinding(getSelectedIndex(), ɵɵinterpolation7(prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, suffix));
        return ɵɵtextInterpolate7;
    }
    function ɵɵtextInterpolate8(prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, i6, v7, suffix) {
        ɵɵtextBinding(getSelectedIndex(), ɵɵinterpolation8(prefix, v0, i0, v1, i1, v2, i2, v3, i3, v4, i4, v5, i5, v6, i6, v7, suffix));
        return ɵɵtextInterpolate8;
    }
    function ɵɵtextInterpolateV(values) {
        ɵɵtextBinding(getSelectedIndex(), ɵɵinterpolationV(values));
        return ɵɵtextInterpolateV;
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    function createRootComponentView(rNode, def, rootView, rendererFactory, renderer, sanitizer) {
        resetComponentState();
        var tView = rootView[TVIEW];
        rootView[0 + HEADER_OFFSET] = rNode;
        var tNode = getOrCreateTNode(tView, null, 0, 3, null, null), componentView = createLView(rootView, getOrCreateTView(def), null, def.onPush ? 64 : 16, rootView[HEADER_OFFSET], tNode, rendererFactory, renderer, sanitizer);
        if (tView.firstTemplatePass) {
            diPublicInInjector(getOrCreateNodeInjectorForNode(tNode, rootView), rootView, def.type);
            tNode.flags = 1;
            initNodeFlags(tNode, rootView.length, 1);
            queueComponentIndexForCheck(tNode);
        }
        return rootView[HEADER_OFFSET] = componentView;
    }
    function createRootComponent(componentView, componentDef, rootView, rootContext, hostFeatures) {
        var tView = rootView[TVIEW], component = instantiateRootComponent(tView, rootView, componentDef);
        rootContext.components.push(component);
        componentView[CONTEXT] = component;
        hostFeatures && hostFeatures.forEach(function(feature) {
            return feature(component, componentDef);
        });
        componentDef.contentQueries && componentDef.contentQueries(1, component, rootView.length - 1);
        var rootTNode = getPreviousOrParentTNode();
        if (tView.firstTemplatePass && componentDef.hostBindings) {
            setActiveHostElement(rootTNode.index - HEADER_OFFSET);
            invokeHostBindingsInCreationMode(componentDef, tView.expandoInstructions, component, rootTNode, tView.firstTemplatePass);
            rootTNode.onElementCreationFns && applyOnCreateInstructions(rootTNode);
            setActiveHostElement(null);
        }
        if (rootTNode.stylingTemplate) {
            var native = componentView[HOST];
            renderInitialClasses(native, rootTNode.stylingTemplate, componentView[RENDERER]);
            renderInitialStyles(native, rootTNode.stylingTemplate, componentView[RENDERER]);
        }
        return component;
    }
    function createRootContext(scheduler, playerHandler) {
        return {
            components: [],
            scheduler: scheduler || defaultScheduler,
            clean: CLEAN_PROMISE,
            playerHandler: playerHandler || null,
            flags: 0
        };
    }
    function LifecycleHooksFeature(component, def) {
        var rootTView = readPatchedLView(component)[TVIEW], dirIndex = rootTView.data.length - 1;
        registerPreOrderHooks(dirIndex, def, rootTView, -1, -1, -1);
        registerPostOrderHooks(rootTView, {
            directiveStart: dirIndex,
            directiveEnd: dirIndex + 1
        });
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    var SimpleChange = function() {
        function SimpleChange(previousValue, currentValue, firstChange) {
            this.previousValue = previousValue;
            this.currentValue = currentValue;
            this.firstChange = firstChange;
        }
        SimpleChange.prototype.isFirstChange = function() {
            return this.firstChange;
        };
        return SimpleChange;
    }();
    function ɵɵNgOnChangesFeature() {
        NgOnChangesFeatureImpl.ngInherit = !0;
        return NgOnChangesFeatureImpl;
    }
    function NgOnChangesFeatureImpl(definition) {
        if (definition.type.prototype.ngOnChanges) {
            definition.setInput = ngOnChangesSetInput;
            definition.onChanges = wrapOnChanges();
        }
    }
    function wrapOnChanges() {
        return function() {
            var simpleChangesStore = getSimpleChangesStore(this), current = simpleChangesStore && simpleChangesStore.current;
            if (current) {
                var previous = simpleChangesStore.previous;
                if (previous === EMPTY_OBJ) simpleChangesStore.previous = current; else for (var key in current) previous[key] = current[key];
                simpleChangesStore.current = null;
                this.ngOnChanges(current);
            }
        };
    }
    function ngOnChangesSetInput(instance, value, publicName, privateName) {
        var simpleChangesStore = getSimpleChangesStore(instance) || setSimpleChangesStore(instance, {
            previous: EMPTY_OBJ,
            current: null
        }), current = simpleChangesStore.current || (simpleChangesStore.current = {}), previous = simpleChangesStore.previous, declaredName = this.declaredInputs[publicName], previousChange = previous[declaredName];
        current[declaredName] = new SimpleChange(previousChange && previousChange.currentValue, value, previous === EMPTY_OBJ);
        instance[privateName] = value;
    }
    var SIMPLE_CHANGES_STORE = "__ngSimpleChanges__";
    function getSimpleChangesStore(instance) {
        return instance[SIMPLE_CHANGES_STORE] || null;
    }
    function setSimpleChangesStore(instance, store) {
        return instance[SIMPLE_CHANGES_STORE] = store;
    }
    function getSuperType(type) {
        return Object.getPrototypeOf(type.prototype).constructor;
    }
    function ɵɵInheritDefinitionFeature(definition) {
        for (var superType = getSuperType(definition.type); superType; ) {
            var superDef = void 0;
            if (isComponentDef(definition)) superDef = superType.ngComponentDef || superType.ngDirectiveDef; else {
                if (superType.ngComponentDef) throw new Error("Directives cannot inherit Components");
                superDef = superType.ngDirectiveDef;
            }
            var baseDef = superType.ngBaseDef;
            if (baseDef || superDef) {
                var writeableDef = definition;
                writeableDef.inputs = maybeUnwrapEmpty(definition.inputs);
                writeableDef.declaredInputs = maybeUnwrapEmpty(definition.declaredInputs);
                writeableDef.outputs = maybeUnwrapEmpty(definition.outputs);
            }
            if (baseDef) {
                var baseViewQuery = baseDef.viewQuery, baseContentQueries = baseDef.contentQueries, baseHostBindings = baseDef.hostBindings;
                baseHostBindings && inheritHostBindings(definition, baseHostBindings);
                baseViewQuery && inheritViewQuery(definition, baseViewQuery);
                baseContentQueries && inheritContentQueries(definition, baseContentQueries);
                fillProperties(definition.inputs, baseDef.inputs);
                fillProperties(definition.declaredInputs, baseDef.declaredInputs);
                fillProperties(definition.outputs, baseDef.outputs);
            }
            if (superDef) {
                var superHostBindings = superDef.hostBindings;
                superHostBindings && inheritHostBindings(definition, superHostBindings);
                var superViewQuery = superDef.viewQuery, superContentQueries = superDef.contentQueries;
                superViewQuery && inheritViewQuery(definition, superViewQuery);
                superContentQueries && inheritContentQueries(definition, superContentQueries);
                fillProperties(definition.inputs, superDef.inputs);
                fillProperties(definition.declaredInputs, superDef.declaredInputs);
                fillProperties(definition.outputs, superDef.outputs);
                definition.afterContentChecked = definition.afterContentChecked || superDef.afterContentChecked;
                definition.afterContentInit = definition.afterContentInit || superDef.afterContentInit;
                definition.afterViewChecked = definition.afterViewChecked || superDef.afterViewChecked;
                definition.afterViewInit = definition.afterViewInit || superDef.afterViewInit;
                definition.doCheck = definition.doCheck || superDef.doCheck;
                definition.onDestroy = definition.onDestroy || superDef.onDestroy;
                definition.onInit = definition.onInit || superDef.onInit;
                var features = superDef.features;
                if (features) for (var _i = 0, features_1 = features; _i < features_1.length; _i++) {
                    var feature = features_1[_i];
                    feature && feature.ngInherit && feature(definition);
                }
            } else {
                var superPrototype = superType.prototype;
                if (superPrototype) {
                    definition.afterContentChecked = definition.afterContentChecked || superPrototype.ngAfterContentChecked;
                    definition.afterContentInit = definition.afterContentInit || superPrototype.ngAfterContentInit;
                    definition.afterViewChecked = definition.afterViewChecked || superPrototype.ngAfterViewChecked;
                    definition.afterViewInit = definition.afterViewInit || superPrototype.ngAfterViewInit;
                    definition.doCheck = definition.doCheck || superPrototype.ngDoCheck;
                    definition.onDestroy = definition.onDestroy || superPrototype.ngOnDestroy;
                    definition.onInit = definition.onInit || superPrototype.ngOnInit;
                    superPrototype.ngOnChanges && ɵɵNgOnChangesFeature()(definition);
                }
            }
            superType = Object.getPrototypeOf(superType);
        }
    }
    function maybeUnwrapEmpty(value) {
        return value === EMPTY_OBJ ? {} : value === EMPTY_ARRAY$1 ? [] : value;
    }
    function inheritViewQuery(definition, superViewQuery) {
        var prevViewQuery = definition.viewQuery;
        definition.viewQuery = prevViewQuery ? function(rf, ctx) {
            superViewQuery(rf, ctx);
            prevViewQuery(rf, ctx);
        } : superViewQuery;
    }
    function inheritContentQueries(definition, superContentQueries) {
        var prevContentQueries = definition.contentQueries;
        definition.contentQueries = prevContentQueries ? function(rf, ctx, directiveIndex) {
            superContentQueries(rf, ctx, directiveIndex);
            prevContentQueries(rf, ctx, directiveIndex);
        } : superContentQueries;
    }
    function inheritHostBindings(definition, superHostBindings) {
        var prevHostBindings = definition.hostBindings;
        superHostBindings !== prevHostBindings && (definition.hostBindings = prevHostBindings ? function(rf, ctx, elementIndex) {
            adjustActiveDirectiveSuperClassDepthPosition(1);
            try {
                superHostBindings(rf, ctx, elementIndex);
            } finally {
                adjustActiveDirectiveSuperClassDepthPosition(-1);
            }
            prevHostBindings(rf, ctx, elementIndex);
        } : superHostBindings);
    }
    function providersResolver(def, providers, viewProviders) {
        var tView = getLView()[TVIEW];
        if (tView.firstTemplatePass) {
            var isComponent_1 = isComponentDef(def);
            resolveProvider(viewProviders, tView.data, tView.blueprint, isComponent_1, !0);
            resolveProvider(providers, tView.data, tView.blueprint, isComponent_1, !1);
        }
    }
    function resolveProvider(provider, tInjectables, lInjectablesBlueprint, isComponent, isViewProvider) {
        provider = resolveForwardRef(provider);
        if (Array.isArray(provider)) for (var i = 0; i < provider.length; i++) resolveProvider(provider[i], tInjectables, lInjectablesBlueprint, isComponent, isViewProvider); else {
            var lView_5 = getLView(), token = isTypeProvider(provider) ? provider : resolveForwardRef(provider.provide), providerFactory = providerToFactory(provider), tNode = getPreviousOrParentTNode(), beginIndex = 65535 & tNode.providerIndexes, endIndex = tNode.directiveStart, cptViewProvidersCount = tNode.providerIndexes >> 16;
            if (isClassProvider(provider) || isTypeProvider(provider)) {
                var ngOnDestroy = (provider.useClass || provider).prototype.ngOnDestroy;
                if (ngOnDestroy) {
                    var tView = lView_5[TVIEW];
                    (tView.destroyHooks || (tView.destroyHooks = [])).push(tInjectables.length, ngOnDestroy);
                }
            }
            if (isTypeProvider(provider) || !provider.multi) {
                var factory = new NodeInjectorFactory(providerFactory, isViewProvider, ɵɵdirectiveInject), existingFactoryIndex = indexOf(token, tInjectables, isViewProvider ? beginIndex : beginIndex + cptViewProvidersCount, endIndex);
                if (-1 == existingFactoryIndex) {
                    diPublicInInjector(getOrCreateNodeInjectorForNode(tNode, lView_5), lView_5, token);
                    tInjectables.push(token);
                    tNode.directiveStart++;
                    tNode.directiveEnd++;
                    isViewProvider && (tNode.providerIndexes += 65536);
                    lInjectablesBlueprint.push(factory);
                    lView_5.push(factory);
                } else {
                    lInjectablesBlueprint[existingFactoryIndex] = factory;
                    lView_5[existingFactoryIndex] = factory;
                }
            } else {
                var existingProvidersFactoryIndex = indexOf(token, tInjectables, beginIndex + cptViewProvidersCount, endIndex), existingViewProvidersFactoryIndex = indexOf(token, tInjectables, beginIndex, beginIndex + cptViewProvidersCount), doesViewProvidersFactoryExist = existingViewProvidersFactoryIndex >= 0 && lInjectablesBlueprint[existingViewProvidersFactoryIndex];
                if (isViewProvider && !doesViewProvidersFactoryExist || !isViewProvider && !(existingProvidersFactoryIndex >= 0 && lInjectablesBlueprint[existingProvidersFactoryIndex])) {
                    diPublicInInjector(getOrCreateNodeInjectorForNode(tNode, lView_5), lView_5, token);
                    factory = multiFactory(isViewProvider ? multiViewProvidersFactoryResolver : multiProvidersFactoryResolver, lInjectablesBlueprint.length, isViewProvider, isComponent, providerFactory);
                    !isViewProvider && doesViewProvidersFactoryExist && (lInjectablesBlueprint[existingViewProvidersFactoryIndex].providerFactory = factory);
                    tInjectables.push(token);
                    tNode.directiveStart++;
                    tNode.directiveEnd++;
                    isViewProvider && (tNode.providerIndexes += 65536);
                    lInjectablesBlueprint.push(factory);
                    lView_5.push(factory);
                } else multiFactoryAdd(lInjectablesBlueprint[isViewProvider ? existingViewProvidersFactoryIndex : existingProvidersFactoryIndex], providerFactory, !isViewProvider && isComponent);
                !isViewProvider && isComponent && doesViewProvidersFactoryExist && lInjectablesBlueprint[existingViewProvidersFactoryIndex].componentProviders++;
            }
        }
    }
    function multiFactoryAdd(multiFactory, factory, isComponentProvider) {
        multiFactory.multi.push(factory);
        isComponentProvider && multiFactory.componentProviders++;
    }
    function indexOf(item, arr, begin, end) {
        for (var i = begin; i < end; i++) if (arr[i] === item) return i;
        return -1;
    }
    function multiProvidersFactoryResolver(_, tData, lData, tNode) {
        return multiResolve(this.multi, []);
    }
    function multiViewProvidersFactoryResolver(_, tData, lData, tNode) {
        var result, factories = this.multi;
        if (this.providerFactory) {
            var componentCount = this.providerFactory.componentProviders, multiProviders = getNodeInjectable(tData, lData, this.providerFactory.index, tNode);
            multiResolve(factories, result = multiProviders.slice(0, componentCount));
            for (var i = componentCount; i < multiProviders.length; i++) result.push(multiProviders[i]);
        } else multiResolve(factories, result = []);
        return result;
    }
    function multiResolve(factories, result) {
        for (var i = 0; i < factories.length; i++) result.push((0, factories[i])());
        return result;
    }
    function multiFactory(factoryFn, index, isViewProvider, isComponent, f) {
        var factory = new NodeInjectorFactory(factoryFn, isViewProvider, ɵɵdirectiveInject);
        factory.multi = [];
        factory.index = index;
        factory.componentProviders = 0;
        multiFactoryAdd(factory, f, isComponent && !isViewProvider);
        return factory;
    }
    function ɵɵProvidersFeature(providers, viewProviders) {
        void 0 === viewProviders && (viewProviders = []);
        return function(definition) {
            definition.providersResolver = function(def, processProvidersFn) {
                return providersResolver(def, processProvidersFn ? processProvidersFn(providers) : providers, viewProviders);
            };
        };
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    var ComponentRef = function() {
        function ComponentRef() {}
        return ComponentRef;
    }(), ComponentFactory = function() {
        function ComponentFactory() {}
        return ComponentFactory;
    }();
    function noComponentFactoryError(component) {
        var error = Error("No component factory found for " + stringify(component) + ". Did you add it to @NgModule.entryComponents?");
        error[ERROR_COMPONENT] = component;
        return error;
    }
    var ERROR_COMPONENT = "ngComponent", _NullComponentFactoryResolver = function() {
        function _NullComponentFactoryResolver() {}
        _NullComponentFactoryResolver.prototype.resolveComponentFactory = function(component) {
            throw noComponentFactoryError(component);
        };
        return _NullComponentFactoryResolver;
    }(), ComponentFactoryResolver = function() {
        function ComponentFactoryResolver() {}
        return ComponentFactoryResolver;
    }();
    ComponentFactoryResolver.NULL = new _NullComponentFactoryResolver();
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    var R3ElementRef, R3TemplateRef, R3ViewContainerRef, NgModuleRef = function() {
        function NgModuleRef() {}
        return NgModuleRef;
    }(), NgModuleFactory = function() {
        function NgModuleFactory() {}
        return NgModuleFactory;
    }(), ViewRef = function() {
        function ViewRef(_lView, _context, _componentIndex) {
            this._context = _context;
            this._componentIndex = _componentIndex;
            this._appRef = null;
            this._viewContainerRef = null;
            this._tViewNode = null;
            this._lView = _lView;
        }
        Object.defineProperty(ViewRef.prototype, "rootNodes", {
            get: function() {
                return null == this._lView[HOST] ? collectNativeNodes(this._lView, this._lView[T_HOST], []) : [];
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(ViewRef.prototype, "context", {
            get: function() {
                return this._context ? this._context : this._lookUpContext();
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(ViewRef.prototype, "destroyed", {
            get: function() {
                return 256 == (256 & this._lView[FLAGS]);
            },
            enumerable: !0,
            configurable: !0
        });
        ViewRef.prototype.destroy = function() {
            if (this._appRef) this._appRef.detachView(this); else if (this._viewContainerRef) {
                var index = this._viewContainerRef.indexOf(this);
                index > -1 && this._viewContainerRef.detach(index);
                this._viewContainerRef = null;
            }
            destroyLView(this._lView);
        };
        ViewRef.prototype.onDestroy = function(callback) {
            storeCleanupFn(this._lView, callback);
        };
        ViewRef.prototype.markForCheck = function() {
            markViewDirty(this._lView);
        };
        ViewRef.prototype.detach = function() {
            this._lView[FLAGS] &= -129;
        };
        ViewRef.prototype.reattach = function() {
            this._lView[FLAGS] |= 128;
        };
        ViewRef.prototype.detectChanges = function() {
            detectChangesInternal(this._lView, this.context);
        };
        ViewRef.prototype.checkNoChanges = function() {
            checkNoChangesInternal(this._lView, this.context);
        };
        ViewRef.prototype.attachToViewContainerRef = function(vcRef) {
            if (this._appRef) throw new Error("This view is already attached directly to the ApplicationRef!");
            this._viewContainerRef = vcRef;
        };
        ViewRef.prototype.detachFromAppRef = function() {
            this._appRef = null;
            renderDetachView(this._lView);
        };
        ViewRef.prototype.attachToAppRef = function(appRef) {
            if (this._viewContainerRef) throw new Error("This view is already attached to a ViewContainer!");
            this._appRef = appRef;
        };
        ViewRef.prototype._lookUpContext = function() {
            return this._context = getLViewParent(this._lView)[this._componentIndex];
        };
        return ViewRef;
    }(), RootViewRef = function(_super) {
        __extends(RootViewRef, _super);
        function RootViewRef(_view) {
            var _this = _super.call(this, _view, null, -1) || this;
            _this._view = _view;
            return _this;
        }
        RootViewRef.prototype.detectChanges = function() {
            detectChangesInRootView(this._view);
        };
        RootViewRef.prototype.checkNoChanges = function() {
            checkNoChangesInRootView(this._view);
        };
        Object.defineProperty(RootViewRef.prototype, "context", {
            get: function() {
                return null;
            },
            enumerable: !0,
            configurable: !0
        });
        return RootViewRef;
    }(ViewRef);
    function collectNativeNodes(lView, parentTNode, result) {
        for (var tNodeChild = parentTNode.child; tNodeChild; ) {
            var nativeNode = getNativeByTNode(tNodeChild, lView);
            nativeNode && result.push(nativeNode);
            if (4 === tNodeChild.type) collectNativeNodes(lView, tNodeChild, result); else if (1 === tNodeChild.type) for (var componentView = findComponentView(lView), componentHost = componentView[T_HOST], parentView = getLViewParent(componentView), currentProjectedNode = componentHost.projection[tNodeChild.projection]; currentProjectedNode && parentView; ) {
                result.push(getNativeByTNode(currentProjectedNode, parentView));
                currentProjectedNode = currentProjectedNode.next;
            }
            tNodeChild = tNodeChild.next;
        }
        return result;
    }
    function injectElementRef(ElementRefToken) {
        return createElementRef(ElementRefToken, getPreviousOrParentTNode(), getLView());
    }
    function createElementRef(ElementRefToken, tNode, view) {
        R3ElementRef || (R3ElementRef = function(_super) {
            __extends(ElementRef_, _super);
            function ElementRef_() {
                return null !== _super && _super.apply(this, arguments) || this;
            }
            return ElementRef_;
        }(ElementRefToken));
        return new R3ElementRef(getNativeByTNode(tNode, view));
    }
    function injectTemplateRef(TemplateRefToken, ElementRefToken) {
        return createTemplateRef(TemplateRefToken, ElementRefToken, getPreviousOrParentTNode(), getLView());
    }
    function createTemplateRef(TemplateRefToken, ElementRefToken, hostTNode, hostView) {
        R3TemplateRef || (R3TemplateRef = function(_super) {
            __extends(TemplateRef_, _super);
            function TemplateRef_(_declarationParentView, elementRef, _tView, _hostLContainer, _injectorIndex) {
                var _this = _super.call(this) || this;
                _this._declarationParentView = _declarationParentView;
                _this.elementRef = elementRef;
                _this._tView = _tView;
                _this._hostLContainer = _hostLContainer;
                _this._injectorIndex = _injectorIndex;
                return _this;
            }
            TemplateRef_.prototype.createEmbeddedView = function(context, container, index) {
                var currentQueries = this._declarationParentView[QUERIES];
                currentQueries && null == this._hostLContainer[QUERIES] && (this._hostLContainer[QUERIES] = currentQueries.container());
                var lView = createEmbeddedViewAndNode(this._tView, context, this._declarationParentView, this._hostLContainer[QUERIES], this._injectorIndex);
                container && insertView(lView, container, index);
                renderEmbeddedTemplate(lView, this._tView, context);
                var viewRef = new ViewRef(lView, context, -1);
                viewRef._tViewNode = lView[T_HOST];
                return viewRef;
            };
            return TemplateRef_;
        }(TemplateRefToken));
        if (0 === hostTNode.type) {
            var hostContainer = hostView[hostTNode.index];
            return new R3TemplateRef(hostView, createElementRef(ElementRefToken, hostTNode, hostView), hostTNode.tViews, hostContainer, hostTNode.injectorIndex);
        }
        return null;
    }
    function injectViewContainerRef(ViewContainerRefToken, ElementRefToken) {
        return createContainerRef(ViewContainerRefToken, ElementRefToken, getPreviousOrParentTNode(), getLView());
    }
    function createContainerRef(ViewContainerRefToken, ElementRefToken, hostTNode, hostView) {
        R3ViewContainerRef || (R3ViewContainerRef = function(_super) {
            __extends(ViewContainerRef_, _super);
            function ViewContainerRef_(_lContainer, _hostTNode, _hostView) {
                var _this = _super.call(this) || this;
                _this._lContainer = _lContainer;
                _this._hostTNode = _hostTNode;
                _this._hostView = _hostView;
                _this._viewRefs = [];
                return _this;
            }
            Object.defineProperty(ViewContainerRef_.prototype, "element", {
                get: function() {
                    return createElementRef(ElementRefToken, this._hostTNode, this._hostView);
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(ViewContainerRef_.prototype, "injector", {
                get: function() {
                    return new NodeInjector(this._hostTNode, this._hostView);
                },
                enumerable: !0,
                configurable: !0
            });
            Object.defineProperty(ViewContainerRef_.prototype, "parentInjector", {
                get: function() {
                    var parentLocation = getParentInjectorLocation(this._hostTNode, this._hostView), parentView = getParentInjectorView(parentLocation, this._hostView), parentTNode = getParentInjectorTNode(parentLocation, this._hostView, this._hostTNode);
                    return hasParentInjector(parentLocation) && null != parentTNode ? new NodeInjector(parentTNode, parentView) : new NodeInjector(null, this._hostView);
                },
                enumerable: !0,
                configurable: !0
            });
            ViewContainerRef_.prototype.clear = function() {
                for (;this.length; ) this.remove(0);
            };
            ViewContainerRef_.prototype.get = function(index) {
                return this._viewRefs[index] || null;
            };
            Object.defineProperty(ViewContainerRef_.prototype, "length", {
                get: function() {
                    var viewAmount = this._lContainer.length - CONTAINER_HEADER_OFFSET;
                    return viewAmount > 0 ? viewAmount : 0;
                },
                enumerable: !0,
                configurable: !0
            });
            ViewContainerRef_.prototype.createEmbeddedView = function(templateRef, context, index) {
                var adjustedIdx = this._adjustIndex(index), viewRef = templateRef.createEmbeddedView(context || {}, this._lContainer, adjustedIdx);
                viewRef.attachToViewContainerRef(this);
                this._viewRefs.splice(adjustedIdx, 0, viewRef);
                return viewRef;
            };
            ViewContainerRef_.prototype.createComponent = function(componentFactory, index, injector, projectableNodes, ngModuleRef) {
                var contextInjector = injector || this.parentInjector;
                !ngModuleRef && null == componentFactory.ngModule && contextInjector && (ngModuleRef = contextInjector.get(NgModuleRef, null));
                var componentRef = componentFactory.create(contextInjector, projectableNodes, void 0, ngModuleRef);
                this.insert(componentRef.hostView, index);
                return componentRef;
            };
            ViewContainerRef_.prototype.insert = function(viewRef, index) {
                if (viewRef.destroyed) throw new Error("Cannot insert a destroyed View in a ViewContainer!");
                var lView = viewRef._lView, adjustedIdx = this._adjustIndex(index);
                if (viewAttachedToContainer(lView)) return this.move(viewRef, adjustedIdx);
                insertView(lView, this._lContainer, adjustedIdx);
                addRemoveViewFromContainer(lView, !0, getBeforeNodeForView(adjustedIdx, this._lContainer));
                viewRef.attachToViewContainerRef(this);
                this._viewRefs.splice(adjustedIdx, 0, viewRef);
                return viewRef;
            };
            ViewContainerRef_.prototype.move = function(viewRef, newIndex) {
                if (viewRef.destroyed) throw new Error("Cannot move a destroyed View in a ViewContainer!");
                var index = this.indexOf(viewRef);
                -1 !== index && this.detach(index);
                this.insert(viewRef, newIndex);
                return viewRef;
            };
            ViewContainerRef_.prototype.indexOf = function(viewRef) {
                return this._viewRefs.indexOf(viewRef);
            };
            ViewContainerRef_.prototype.remove = function(index) {
                var adjustedIdx = this._adjustIndex(index, -1);
                removeView(this._lContainer, adjustedIdx);
                this._viewRefs.splice(adjustedIdx, 1);
            };
            ViewContainerRef_.prototype.detach = function(index) {
                var adjustedIdx = this._adjustIndex(index, -1), view = detachView(this._lContainer, adjustedIdx);
                return view && null != this._viewRefs.splice(adjustedIdx, 1)[0] ? new ViewRef(view, view[CONTEXT], -1) : null;
            };
            ViewContainerRef_.prototype._adjustIndex = function(index, shift) {
                void 0 === shift && (shift = 0);
                return null == index ? this.length + shift : index;
            };
            return ViewContainerRef_;
        }(ViewContainerRefToken));
        var lContainer, slotValue = hostView[hostTNode.index];
        if (isLContainer(slotValue)) (lContainer = slotValue)[ACTIVE_INDEX] = -1; else {
            var commentNode = void 0;
            commentNode = 4 === hostTNode.type ? unwrapRNode(slotValue) : hostView[RENDERER].createComment("");
            if (isRootView(hostView)) {
                var renderer = hostView[RENDERER], hostNative = getNativeByTNode(hostTNode, hostView);
                nativeInsertBefore(renderer, nativeParentNode(renderer, hostNative), commentNode, nativeNextSibling(renderer, hostNative));
            } else appendChild(commentNode, hostTNode, hostView);
            hostView[hostTNode.index] = lContainer = createLContainer(slotValue, hostView, commentNode, hostTNode, !0);
            addToViewTree(hostView, lContainer);
        }
        return new R3ViewContainerRef(lContainer, hostTNode, hostView);
    }
    function injectChangeDetectorRef() {
        return createViewRef(getPreviousOrParentTNode(), getLView(), null);
    }
    function createViewRef(hostTNode, hostView, context) {
        if (isComponent(hostTNode)) {
            var componentIndex = hostTNode.directiveStart, componentView = getComponentViewByIndex(hostTNode.index, hostView);
            return new ViewRef(componentView, context, componentIndex);
        }
        if (3 === hostTNode.type || 0 === hostTNode.type || 4 === hostTNode.type) {
            var hostComponentView = findComponentView(hostView);
            return new ViewRef(hostComponentView, hostComponentView[CONTEXT], -1);
        }
        return null;
    }
    function getOrCreateRenderer2(view) {
        var renderer = view[RENDERER];
        if (isProceduralRenderer(renderer)) return renderer;
        throw new Error("Cannot inject Renderer2 when the application uses Renderer3!");
    }
    function injectRenderer2() {
        return getOrCreateRenderer2(getLView());
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    var ElementRef = function() {
        function ElementRef(nativeElement) {
            this.nativeElement = nativeElement;
        }
        return ElementRef;
    }();
    ElementRef.__NG_ELEMENT_ID__ = function() {
        return SWITCH_ELEMENT_REF_FACTORY(ElementRef);
    };
    var SWITCH_ELEMENT_REF_FACTORY = injectElementRef, Renderer = function() {
        function Renderer() {}
        return Renderer;
    }(), RendererFactory2 = (new InjectionToken("Renderer2Interceptor"), function() {
        function RendererFactory2() {}
        return RendererFactory2;
    }()), Renderer2 = function() {
        function Renderer2() {}
        return Renderer2;
    }();
    Renderer2.__NG_ELEMENT_ID__ = function() {
        return SWITCH_RENDERER2_FACTORY();
    };
    var SWITCH_RENDERER2_FACTORY = injectRenderer2, VERSION = new (function() {
        function Version(full) {
            this.full = full;
            this.major = full.split(".")[0];
            this.minor = full.split(".")[1];
            this.patch = full.split(".").slice(2).join(".");
        }
        return Version;
    }())("0.0.0-PLACEHOLDER"), DefaultIterableDifferFactory = function() {
        function DefaultIterableDifferFactory() {}
        DefaultIterableDifferFactory.prototype.supports = function(obj) {
            return isListLikeIterable(obj);
        };
        DefaultIterableDifferFactory.prototype.create = function(trackByFn) {
            return new DefaultIterableDiffer(trackByFn);
        };
        return DefaultIterableDifferFactory;
    }(), trackByIdentity = function(index, item) {
        return item;
    }, DefaultIterableDiffer = function() {
        function DefaultIterableDiffer(trackByFn) {
            this.length = 0;
            this._linkedRecords = null;
            this._unlinkedRecords = null;
            this._previousItHead = null;
            this._itHead = null;
            this._itTail = null;
            this._additionsHead = null;
            this._additionsTail = null;
            this._movesHead = null;
            this._movesTail = null;
            this._removalsHead = null;
            this._removalsTail = null;
            this._identityChangesHead = null;
            this._identityChangesTail = null;
            this._trackByFn = trackByFn || trackByIdentity;
        }
        DefaultIterableDiffer.prototype.forEachItem = function(fn) {
            var record;
            for (record = this._itHead; null !== record; record = record._next) fn(record);
        };
        DefaultIterableDiffer.prototype.forEachOperation = function(fn) {
            for (var nextIt = this._itHead, nextRemove = this._removalsHead, addRemoveOffset = 0, moveOffsets = null; nextIt || nextRemove; ) {
                var record = !nextRemove || nextIt && nextIt.currentIndex < getPreviousIndex(nextRemove, addRemoveOffset, moveOffsets) ? nextIt : nextRemove, adjPreviousIndex = getPreviousIndex(record, addRemoveOffset, moveOffsets), currentIndex = record.currentIndex;
                if (record === nextRemove) {
                    addRemoveOffset--;
                    nextRemove = nextRemove._nextRemoved;
                } else {
                    nextIt = nextIt._next;
                    if (null == record.previousIndex) addRemoveOffset++; else {
                        moveOffsets || (moveOffsets = []);
                        var localMovePreviousIndex = adjPreviousIndex - addRemoveOffset, localCurrentIndex = currentIndex - addRemoveOffset;
                        if (localMovePreviousIndex != localCurrentIndex) {
                            for (var i = 0; i < localMovePreviousIndex; i++) {
                                var offset = i < moveOffsets.length ? moveOffsets[i] : moveOffsets[i] = 0, index = offset + i;
                                localCurrentIndex <= index && index < localMovePreviousIndex && (moveOffsets[i] = offset + 1);
                            }
                            moveOffsets[record.previousIndex] = localCurrentIndex - localMovePreviousIndex;
                        }
                    }
                }
                adjPreviousIndex !== currentIndex && fn(record, adjPreviousIndex, currentIndex);
            }
        };
        DefaultIterableDiffer.prototype.forEachPreviousItem = function(fn) {
            var record;
            for (record = this._previousItHead; null !== record; record = record._nextPrevious) fn(record);
        };
        DefaultIterableDiffer.prototype.forEachAddedItem = function(fn) {
            var record;
            for (record = this._additionsHead; null !== record; record = record._nextAdded) fn(record);
        };
        DefaultIterableDiffer.prototype.forEachMovedItem = function(fn) {
            var record;
            for (record = this._movesHead; null !== record; record = record._nextMoved) fn(record);
        };
        DefaultIterableDiffer.prototype.forEachRemovedItem = function(fn) {
            var record;
            for (record = this._removalsHead; null !== record; record = record._nextRemoved) fn(record);
        };
        DefaultIterableDiffer.prototype.forEachIdentityChange = function(fn) {
            var record;
            for (record = this._identityChangesHead; null !== record; record = record._nextIdentityChange) fn(record);
        };
        DefaultIterableDiffer.prototype.diff = function(collection) {
            null == collection && (collection = []);
            if (!isListLikeIterable(collection)) throw new Error("Error trying to diff '" + stringify(collection) + "'. Only arrays and iterables are allowed");
            return this.check(collection) ? this : null;
        };
        DefaultIterableDiffer.prototype.onDestroy = function() {};
        DefaultIterableDiffer.prototype.check = function(collection) {
            var _this = this;
            this._reset();
            var index, item, itemTrackBy, record = this._itHead, mayBeDirty = !1;
            if (Array.isArray(collection)) {
                this.length = collection.length;
                for (var index_1 = 0; index_1 < this.length; index_1++) {
                    itemTrackBy = this._trackByFn(index_1, item = collection[index_1]);
                    if (null !== record && looseIdentical(record.trackById, itemTrackBy)) {
                        mayBeDirty && (record = this._verifyReinsertion(record, item, itemTrackBy, index_1));
                        looseIdentical(record.item, item) || this._addIdentityChange(record, item);
                    } else {
                        record = this._mismatch(record, item, itemTrackBy, index_1);
                        mayBeDirty = !0;
                    }
                    record = record._next;
                }
            } else {
                index = 0;
                iterateListLike(collection, function(item) {
                    itemTrackBy = _this._trackByFn(index, item);
                    if (null !== record && looseIdentical(record.trackById, itemTrackBy)) {
                        mayBeDirty && (record = _this._verifyReinsertion(record, item, itemTrackBy, index));
                        looseIdentical(record.item, item) || _this._addIdentityChange(record, item);
                    } else {
                        record = _this._mismatch(record, item, itemTrackBy, index);
                        mayBeDirty = !0;
                    }
                    record = record._next;
                    index++;
                });
                this.length = index;
            }
            this._truncate(record);
            this.collection = collection;
            return this.isDirty;
        };
        Object.defineProperty(DefaultIterableDiffer.prototype, "isDirty", {
            get: function() {
                return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead;
            },
            enumerable: !0,
            configurable: !0
        });
        DefaultIterableDiffer.prototype._reset = function() {
            if (this.isDirty) {
                var record = void 0, nextRecord = void 0;
                for (record = this._previousItHead = this._itHead; null !== record; record = record._next) record._nextPrevious = record._next;
                for (record = this._additionsHead; null !== record; record = record._nextAdded) record.previousIndex = record.currentIndex;
                this._additionsHead = this._additionsTail = null;
                for (record = this._movesHead; null !== record; record = nextRecord) {
                    record.previousIndex = record.currentIndex;
                    nextRecord = record._nextMoved;
                }
                this._movesHead = this._movesTail = null;
                this._removalsHead = this._removalsTail = null;
                this._identityChangesHead = this._identityChangesTail = null;
            }
        };
        DefaultIterableDiffer.prototype._mismatch = function(record, item, itemTrackBy, index) {
            var previousRecord;
            if (null === record) previousRecord = this._itTail; else {
                previousRecord = record._prev;
                this._remove(record);
            }
            if (null !== (record = null === this._linkedRecords ? null : this._linkedRecords.get(itemTrackBy, index))) {
                looseIdentical(record.item, item) || this._addIdentityChange(record, item);
                this._moveAfter(record, previousRecord, index);
            } else if (null !== (record = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(itemTrackBy, null))) {
                looseIdentical(record.item, item) || this._addIdentityChange(record, item);
                this._reinsertAfter(record, previousRecord, index);
            } else record = this._addAfter(new IterableChangeRecord_(item, itemTrackBy), previousRecord, index);
            return record;
        };
        DefaultIterableDiffer.prototype._verifyReinsertion = function(record, item, itemTrackBy, index) {
            var reinsertRecord = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(itemTrackBy, null);
            if (null !== reinsertRecord) record = this._reinsertAfter(reinsertRecord, record._prev, index); else if (record.currentIndex != index) {
                record.currentIndex = index;
                this._addToMoves(record, index);
            }
            return record;
        };
        DefaultIterableDiffer.prototype._truncate = function(record) {
            for (;null !== record; ) {
                var nextRecord = record._next;
                this._addToRemovals(this._unlink(record));
                record = nextRecord;
            }
            null !== this._unlinkedRecords && this._unlinkedRecords.clear();
            null !== this._additionsTail && (this._additionsTail._nextAdded = null);
            null !== this._movesTail && (this._movesTail._nextMoved = null);
            null !== this._itTail && (this._itTail._next = null);
            null !== this._removalsTail && (this._removalsTail._nextRemoved = null);
            null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null);
        };
        DefaultIterableDiffer.prototype._reinsertAfter = function(record, prevRecord, index) {
            null !== this._unlinkedRecords && this._unlinkedRecords.remove(record);
            var prev = record._prevRemoved, next = record._nextRemoved;
            null === prev ? this._removalsHead = next : prev._nextRemoved = next;
            null === next ? this._removalsTail = prev : next._prevRemoved = prev;
            this._insertAfter(record, prevRecord, index);
            this._addToMoves(record, index);
            return record;
        };
        DefaultIterableDiffer.prototype._moveAfter = function(record, prevRecord, index) {
            this._unlink(record);
            this._insertAfter(record, prevRecord, index);
            this._addToMoves(record, index);
            return record;
        };
        DefaultIterableDiffer.prototype._addAfter = function(record, prevRecord, index) {
            this._insertAfter(record, prevRecord, index);
            this._additionsTail = null === this._additionsTail ? this._additionsHead = record : this._additionsTail._nextAdded = record;
            return record;
        };
        DefaultIterableDiffer.prototype._insertAfter = function(record, prevRecord, index) {
            var next = null === prevRecord ? this._itHead : prevRecord._next;
            record._next = next;
            record._prev = prevRecord;
            null === next ? this._itTail = record : next._prev = record;
            null === prevRecord ? this._itHead = record : prevRecord._next = record;
            null === this._linkedRecords && (this._linkedRecords = new _DuplicateMap());
            this._linkedRecords.put(record);
            record.currentIndex = index;
            return record;
        };
        DefaultIterableDiffer.prototype._remove = function(record) {
            return this._addToRemovals(this._unlink(record));
        };
        DefaultIterableDiffer.prototype._unlink = function(record) {
            null !== this._linkedRecords && this._linkedRecords.remove(record);
            var prev = record._prev, next = record._next;
            null === prev ? this._itHead = next : prev._next = next;
            null === next ? this._itTail = prev : next._prev = prev;
            return record;
        };
        DefaultIterableDiffer.prototype._addToMoves = function(record, toIndex) {
            if (record.previousIndex === toIndex) return record;
            this._movesTail = null === this._movesTail ? this._movesHead = record : this._movesTail._nextMoved = record;
            return record;
        };
        DefaultIterableDiffer.prototype._addToRemovals = function(record) {
            null === this._unlinkedRecords && (this._unlinkedRecords = new _DuplicateMap());
            this._unlinkedRecords.put(record);
            record.currentIndex = null;
            record._nextRemoved = null;
            if (null === this._removalsTail) {
                this._removalsTail = this._removalsHead = record;
                record._prevRemoved = null;
            } else {
                record._prevRemoved = this._removalsTail;
                this._removalsTail = this._removalsTail._nextRemoved = record;
            }
            return record;
        };
        DefaultIterableDiffer.prototype._addIdentityChange = function(record, item) {
            record.item = item;
            this._identityChangesTail = null === this._identityChangesTail ? this._identityChangesHead = record : this._identityChangesTail._nextIdentityChange = record;
            return record;
        };
        return DefaultIterableDiffer;
    }(), IterableChangeRecord_ = function() {
        function IterableChangeRecord_(item, trackById) {
            this.item = item;
            this.trackById = trackById;
            this.currentIndex = null;
            this.previousIndex = null;
            this._nextPrevious = null;
            this._prev = null;
            this._next = null;
            this._prevDup = null;
            this._nextDup = null;
            this._prevRemoved = null;
            this._nextRemoved = null;
            this._nextAdded = null;
            this._nextMoved = null;
            this._nextIdentityChange = null;
        }
        return IterableChangeRecord_;
    }(), _DuplicateItemRecordList = function() {
        function _DuplicateItemRecordList() {
            this._head = null;
            this._tail = null;
        }
        _DuplicateItemRecordList.prototype.add = function(record) {
            if (null === this._head) {
                this._head = this._tail = record;
                record._nextDup = null;
                record._prevDup = null;
            } else {
                this._tail._nextDup = record;
                record._prevDup = this._tail;
                record._nextDup = null;
                this._tail = record;
            }
        };
        _DuplicateItemRecordList.prototype.get = function(trackById, atOrAfterIndex) {
            var record;
            for (record = this._head; null !== record; record = record._nextDup) if ((null === atOrAfterIndex || atOrAfterIndex <= record.currentIndex) && looseIdentical(record.trackById, trackById)) return record;
            return null;
        };
        _DuplicateItemRecordList.prototype.remove = function(record) {
            var prev = record._prevDup, next = record._nextDup;
            null === prev ? this._head = next : prev._nextDup = next;
            null === next ? this._tail = prev : next._prevDup = prev;
            return null === this._head;
        };
        return _DuplicateItemRecordList;
    }(), _DuplicateMap = function() {
        function _DuplicateMap() {
            this.map = new Map();
        }
        _DuplicateMap.prototype.put = function(record) {
            var key = record.trackById, duplicates = this.map.get(key);
            if (!duplicates) {
                duplicates = new _DuplicateItemRecordList();
                this.map.set(key, duplicates);
            }
            duplicates.add(record);
        };
        _DuplicateMap.prototype.get = function(trackById, atOrAfterIndex) {
            var recordList = this.map.get(trackById);
            return recordList ? recordList.get(trackById, atOrAfterIndex) : null;
        };
        _DuplicateMap.prototype.remove = function(record) {
            var key = record.trackById;
            this.map.get(key).remove(record) && this.map.delete(key);
            return record;
        };
        Object.defineProperty(_DuplicateMap.prototype, "isEmpty", {
            get: function() {
                return 0 === this.map.size;
            },
            enumerable: !0,
            configurable: !0
        });
        _DuplicateMap.prototype.clear = function() {
            this.map.clear();
        };
        return _DuplicateMap;
    }();
    function getPreviousIndex(item, addRemoveOffset, moveOffsets) {
        var previousIndex = item.previousIndex;
        if (null === previousIndex) return previousIndex;
        var moveOffset = 0;
        moveOffsets && previousIndex < moveOffsets.length && (moveOffset = moveOffsets[previousIndex]);
        return previousIndex + addRemoveOffset + moveOffset;
    }
    var DefaultKeyValueDifferFactory = function() {
        function DefaultKeyValueDifferFactory() {}
        DefaultKeyValueDifferFactory.prototype.supports = function(obj) {
            return obj instanceof Map || isJsObject(obj);
        };
        DefaultKeyValueDifferFactory.prototype.create = function() {
            return new DefaultKeyValueDiffer();
        };
        return DefaultKeyValueDifferFactory;
    }(), DefaultKeyValueDiffer = function() {
        function DefaultKeyValueDiffer() {
            this._records = new Map();
            this._mapHead = null;
            this._appendAfter = null;
            this._previousMapHead = null;
            this._changesHead = null;
            this._changesTail = null;
            this._additionsHead = null;
            this._additionsTail = null;
            this._removalsHead = null;
            this._removalsTail = null;
        }
        Object.defineProperty(DefaultKeyValueDiffer.prototype, "isDirty", {
            get: function() {
                return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead;
            },
            enumerable: !0,
            configurable: !0
        });
        DefaultKeyValueDiffer.prototype.forEachItem = function(fn) {
            var record;
            for (record = this._mapHead; null !== record; record = record._next) fn(record);
        };
        DefaultKeyValueDiffer.prototype.forEachPreviousItem = function(fn) {
            var record;
            for (record = this._previousMapHead; null !== record; record = record._nextPrevious) fn(record);
        };
        DefaultKeyValueDiffer.prototype.forEachChangedItem = function(fn) {
            var record;
            for (record = this._changesHead; null !== record; record = record._nextChanged) fn(record);
        };
        DefaultKeyValueDiffer.prototype.forEachAddedItem = function(fn) {
            var record;
            for (record = this._additionsHead; null !== record; record = record._nextAdded) fn(record);
        };
        DefaultKeyValueDiffer.prototype.forEachRemovedItem = function(fn) {
            var record;
            for (record = this._removalsHead; null !== record; record = record._nextRemoved) fn(record);
        };
        DefaultKeyValueDiffer.prototype.diff = function(map) {
            if (map) {
                if (!(map instanceof Map || isJsObject(map))) throw new Error("Error trying to diff '" + stringify(map) + "'. Only maps and objects are allowed");
            } else map = new Map();
            return this.check(map) ? this : null;
        };
        DefaultKeyValueDiffer.prototype.onDestroy = function() {};
        DefaultKeyValueDiffer.prototype.check = function(map) {
            var _this = this;
            this._reset();
            var insertBefore = this._mapHead;
            this._appendAfter = null;
            this._forEach(map, function(value, key) {
                if (insertBefore && insertBefore.key === key) {
                    _this._maybeAddToChanges(insertBefore, value);
                    _this._appendAfter = insertBefore;
                    insertBefore = insertBefore._next;
                } else {
                    var record = _this._getOrCreateRecordForKey(key, value);
                    insertBefore = _this._insertBeforeOrAppend(insertBefore, record);
                }
            });
            if (insertBefore) {
                insertBefore._prev && (insertBefore._prev._next = null);
                this._removalsHead = insertBefore;
                for (var record = insertBefore; null !== record; record = record._nextRemoved) {
                    record === this._mapHead && (this._mapHead = null);
                    this._records.delete(record.key);
                    record._nextRemoved = record._next;
                    record.previousValue = record.currentValue;
                    record.currentValue = null;
                    record._prev = null;
                    record._next = null;
                }
            }
            this._changesTail && (this._changesTail._nextChanged = null);
            this._additionsTail && (this._additionsTail._nextAdded = null);
            return this.isDirty;
        };
        DefaultKeyValueDiffer.prototype._insertBeforeOrAppend = function(before, record) {
            if (before) {
                var prev = before._prev;
                record._next = before;
                record._prev = prev;
                before._prev = record;
                prev && (prev._next = record);
                before === this._mapHead && (this._mapHead = record);
                this._appendAfter = before;
                return before;
            }
            if (this._appendAfter) {
                this._appendAfter._next = record;
                record._prev = this._appendAfter;
            } else this._mapHead = record;
            this._appendAfter = record;
            return null;
        };
        DefaultKeyValueDiffer.prototype._getOrCreateRecordForKey = function(key, value) {
            if (this._records.has(key)) {
                var record_1 = this._records.get(key);
                this._maybeAddToChanges(record_1, value);
                var prev = record_1._prev, next = record_1._next;
                prev && (prev._next = next);
                next && (next._prev = prev);
                record_1._next = null;
                record_1._prev = null;
                return record_1;
            }
            var record = new KeyValueChangeRecord_(key);
            this._records.set(key, record);
            record.currentValue = value;
            this._addToAdditions(record);
            return record;
        };
        DefaultKeyValueDiffer.prototype._reset = function() {
            if (this.isDirty) {
                var record = void 0;
                this._previousMapHead = this._mapHead;
                for (record = this._previousMapHead; null !== record; record = record._next) record._nextPrevious = record._next;
                for (record = this._changesHead; null !== record; record = record._nextChanged) record.previousValue = record.currentValue;
                for (record = this._additionsHead; null != record; record = record._nextAdded) record.previousValue = record.currentValue;
                this._changesHead = this._changesTail = null;
                this._additionsHead = this._additionsTail = null;
                this._removalsHead = null;
            }
        };
        DefaultKeyValueDiffer.prototype._maybeAddToChanges = function(record, newValue) {
            if (!looseIdentical(newValue, record.currentValue)) {
                record.previousValue = record.currentValue;
                record.currentValue = newValue;
                this._addToChanges(record);
            }
        };
        DefaultKeyValueDiffer.prototype._addToAdditions = function(record) {
            if (null === this._additionsHead) this._additionsHead = this._additionsTail = record; else {
                this._additionsTail._nextAdded = record;
                this._additionsTail = record;
            }
        };
        DefaultKeyValueDiffer.prototype._addToChanges = function(record) {
            if (null === this._changesHead) this._changesHead = this._changesTail = record; else {
                this._changesTail._nextChanged = record;
                this._changesTail = record;
            }
        };
        DefaultKeyValueDiffer.prototype._forEach = function(obj, fn) {
            obj instanceof Map ? obj.forEach(fn) : Object.keys(obj).forEach(function(k) {
                return fn(obj[k], k);
            });
        };
        return DefaultKeyValueDiffer;
    }(), KeyValueChangeRecord_ = function() {
        function KeyValueChangeRecord_(key) {
            this.key = key;
            this.previousValue = null;
            this.currentValue = null;
            this._nextPrevious = null;
            this._next = null;
            this._prev = null;
            this._nextAdded = null;
            this._nextRemoved = null;
            this._nextChanged = null;
        }
        return KeyValueChangeRecord_;
    }(), IterableDiffers = function() {
        function IterableDiffers(factories) {
            this.factories = factories;
        }
        IterableDiffers.create = function(factories, parent) {
            if (null != parent) {
                var copied = parent.factories.slice();
                factories = factories.concat(copied);
            }
            return new IterableDiffers(factories);
        };
        IterableDiffers.extend = function(factories) {
            return {
                provide: IterableDiffers,
                useFactory: function(parent) {
                    if (!parent) throw new Error("Cannot extend IterableDiffers without a parent injector");
                    return IterableDiffers.create(factories, parent);
                },
                deps: [ [ IterableDiffers, new SkipSelf(), new Optional() ] ]
            };
        };
        IterableDiffers.prototype.find = function(iterable) {
            var factory = this.factories.find(function(f) {
                return f.supports(iterable);
            });
            if (null != factory) return factory;
            throw new Error("Cannot find a differ supporting object '" + iterable + "' of type '" + getTypeNameForDebugging(iterable) + "'");
        };
        return IterableDiffers;
    }();
    IterableDiffers.ngInjectableDef = ɵɵdefineInjectable({
        providedIn: "root",
        factory: function() {
            return new IterableDiffers([ new DefaultIterableDifferFactory() ]);
        }
    });
    function getTypeNameForDebugging(type) {
        return type.name || typeof type;
    }
    var KeyValueDiffers = function() {
        function KeyValueDiffers(factories) {
            this.factories = factories;
        }
        KeyValueDiffers.create = function(factories, parent) {
            if (parent) {
                var copied = parent.factories.slice();
                factories = factories.concat(copied);
            }
            return new KeyValueDiffers(factories);
        };
        KeyValueDiffers.extend = function(factories) {
            return {
                provide: KeyValueDiffers,
                useFactory: function(parent) {
                    if (!parent) throw new Error("Cannot extend KeyValueDiffers without a parent injector");
                    return KeyValueDiffers.create(factories, parent);
                },
                deps: [ [ KeyValueDiffers, new SkipSelf(), new Optional() ] ]
            };
        };
        KeyValueDiffers.prototype.find = function(kv) {
            var factory = this.factories.find(function(f) {
                return f.supports(kv);
            });
            if (factory) return factory;
            throw new Error("Cannot find a differ supporting object '" + kv + "'");
        };
        return KeyValueDiffers;
    }();
    KeyValueDiffers.ngInjectableDef = ɵɵdefineInjectable({
        providedIn: "root",
        factory: function() {
            return new KeyValueDiffers([ new DefaultKeyValueDifferFactory() ]);
        }
    });
    var ChangeDetectorRef = function() {
        function ChangeDetectorRef() {}
        return ChangeDetectorRef;
    }();
    ChangeDetectorRef.__NG_ELEMENT_ID__ = function() {
        return SWITCH_CHANGE_DETECTOR_REF_FACTORY();
    };
    var SWITCH_CHANGE_DETECTOR_REF_FACTORY = injectChangeDetectorRef, keyValDiff = [ new DefaultKeyValueDifferFactory() ], iterableDiff = [ new DefaultIterableDifferFactory() ], defaultIterableDiffers = new IterableDiffers(iterableDiff), defaultKeyValueDiffers = new KeyValueDiffers(keyValDiff), TemplateRef = function() {
        function TemplateRef() {}
        return TemplateRef;
    }();
    TemplateRef.__NG_ELEMENT_ID__ = function() {
        return SWITCH_TEMPLATE_REF_FACTORY(TemplateRef, ElementRef);
    };
    var SWITCH_TEMPLATE_REF_FACTORY = injectTemplateRef, ViewContainerRef = function() {
        function ViewContainerRef() {}
        return ViewContainerRef;
    }();
    ViewContainerRef.__NG_ELEMENT_ID__ = function() {
        return SWITCH_VIEW_CONTAINER_REF_FACTORY(ViewContainerRef, ElementRef);
    };
    var SWITCH_VIEW_CONTAINER_REF_FACTORY = injectViewContainerRef, _tokenKeyCache = new Map();
    function tokenKey(token) {
        var key = _tokenKeyCache.get(token);
        if (!key) {
            key = stringify(token) + "_" + _tokenKeyCache.size;
            _tokenKeyCache.set(token, key);
        }
        return key;
    }
    tokenKey(Injector), tokenKey(INJECTOR), tokenKey(NgModuleRef), tokenKey(Renderer), 
    tokenKey(Renderer2), tokenKey(ElementRef), tokenKey(ViewContainerRef), tokenKey(TemplateRef), 
    tokenKey(ChangeDetectorRef), tokenKey(Injector), tokenKey(INJECTOR);
    var NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR = {}, ComponentFactoryResolver$1 = function(_super) {
        __extends(ComponentFactoryResolver$1, _super);
        function ComponentFactoryResolver$1(ngModule) {
            var _this = _super.call(this) || this;
            _this.ngModule = ngModule;
            return _this;
        }
        ComponentFactoryResolver$1.prototype.resolveComponentFactory = function(component) {
            var componentDef = getComponentDef(component);
            return new ComponentFactory$1(componentDef, this.ngModule);
        };
        return ComponentFactoryResolver$1;
    }(ComponentFactoryResolver);
    function toRefArray(map) {
        var array = [];
        for (var nonMinified in map) map.hasOwnProperty(nonMinified) && array.push({
            propName: map[nonMinified],
            templateName: nonMinified
        });
        return array;
    }
    var ROOT_CONTEXT = new InjectionToken("ROOT_CONTEXT_TOKEN", {
        providedIn: "root",
        factory: function() {
            return createRootContext(ɵɵinject(SCHEDULER));
        }
    }), SCHEDULER = new InjectionToken("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: function() {
            return defaultScheduler;
        }
    });
    function createChainedInjector(rootViewInjector, moduleInjector) {
        return {
            get: function(token, notFoundValue, flags) {
                var value = rootViewInjector.get(token, NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR, flags);
                return value !== NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR || notFoundValue === NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR ? value : moduleInjector.get(token, notFoundValue, flags);
            }
        };
    }
    var ComponentFactory$1 = function(_super) {
        __extends(ComponentFactory$1, _super);
        function ComponentFactory$1(componentDef, ngModule) {
            var _this = _super.call(this) || this;
            _this.componentDef = componentDef;
            _this.ngModule = ngModule;
            _this.componentType = componentDef.type;
            _this.selector = componentDef.selectors[0][0];
            _this.ngContentSelectors = componentDef.ngContentSelectors ? componentDef.ngContentSelectors : [];
            _this.isBoundToModule = !!ngModule;
            return _this;
        }
        Object.defineProperty(ComponentFactory$1.prototype, "inputs", {
            get: function() {
                return toRefArray(this.componentDef.inputs);
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(ComponentFactory$1.prototype, "outputs", {
            get: function() {
                return toRefArray(this.componentDef.outputs);
            },
            enumerable: !0,
            configurable: !0
        });
        ComponentFactory$1.prototype.create = function(injector, projectableNodes, rootSelectorOrNode, ngModule) {
            var isInternalRootView = void 0 === rootSelectorOrNode, rootViewInjector = (ngModule = ngModule || this.ngModule) ? createChainedInjector(injector, ngModule.injector) : injector, rendererFactory = rootViewInjector.get(RendererFactory2, domRendererFactory3), sanitizer = rootViewInjector.get(Sanitizer, null), hostRNode = isInternalRootView ? elementCreate(this.selector, rendererFactory.createRenderer(null, this.componentDef)) : locateHostElement(rendererFactory, rootSelectorOrNode), rootFlags = this.componentDef.onPush ? 576 : 528, isIsolated = "string" == typeof rootSelectorOrNode && /^#root-ng-internal-isolated-\d+/.test(rootSelectorOrNode), rootContext = isInternalRootView || isIsolated ? createRootContext() : rootViewInjector.get(ROOT_CONTEXT), renderer = rendererFactory.createRenderer(hostRNode, this.componentDef);
            rootSelectorOrNode && hostRNode && (isProceduralRenderer(renderer) ? renderer.setAttribute(hostRNode, "ng-version", VERSION.full) : hostRNode.setAttribute("ng-version", VERSION.full));
            var component, tElementNode, rootLView = createLView(null, createTView(-1, null, 1, 0, null, null, null, null), rootContext, rootFlags, null, null, rendererFactory, renderer, sanitizer, rootViewInjector), oldLView = enterView(rootLView, null);
            try {
                var componentView = createRootComponentView(hostRNode, this.componentDef, rootLView, rendererFactory, renderer);
                tElementNode = getTNode(0, rootLView);
                projectableNodes && (tElementNode.projection = projectableNodes.map(function(nodesforSlot) {
                    return Array.from(nodesforSlot);
                }));
                component = createRootComponent(componentView, this.componentDef, rootLView, rootContext, [ LifecycleHooksFeature ]);
                addToViewTree(rootLView, componentView);
                refreshDescendantViews(rootLView);
            } finally {
                leaveView(oldLView);
            }
            var componentRef = new ComponentRef$1(this.componentType, component, createElementRef(ElementRef, tElementNode, rootLView), rootLView, tElementNode);
            isInternalRootView && (componentRef.hostView._tViewNode.child = tElementNode);
            return componentRef;
        };
        return ComponentFactory$1;
    }(ComponentFactory), ComponentRef$1 = (new ComponentFactoryResolver$1(), function(_super) {
        __extends(ComponentRef$1, _super);
        function ComponentRef$1(componentType, instance, location, _rootLView, _tNode) {
            var _this = _super.call(this) || this;
            _this.location = location;
            _this._rootLView = _rootLView;
            _this._tNode = _tNode;
            _this.destroyCbs = [];
            _this.instance = instance;
            _this.hostView = _this.changeDetectorRef = new RootViewRef(_rootLView);
            _this.hostView._tViewNode = assignTViewNodeToLView(_rootLView[TVIEW], null, -1, _rootLView);
            _this.componentType = componentType;
            return _this;
        }
        Object.defineProperty(ComponentRef$1.prototype, "injector", {
            get: function() {
                return new NodeInjector(this._tNode, this._rootLView);
            },
            enumerable: !0,
            configurable: !0
        });
        ComponentRef$1.prototype.destroy = function() {
            this.destroyCbs.forEach(function(fn) {
                return fn();
            });
            this.destroyCbs = null;
            !this.hostView.destroyed && this.hostView.destroy();
        };
        ComponentRef$1.prototype.onDestroy = function(callback) {
            this.destroyCbs.push(callback);
        };
        return ComponentRef$1;
    }(ComponentRef)), LOCALE_DATA = {}, LocaleDataIndex = {
        LocaleId: 0,
        DayPeriodsFormat: 1,
        DayPeriodsStandalone: 2,
        DaysFormat: 3,
        DaysStandalone: 4,
        MonthsFormat: 5,
        MonthsStandalone: 6,
        Eras: 7,
        FirstDayOfWeek: 8,
        WeekendRange: 9,
        DateFormat: 10,
        TimeFormat: 11,
        DateTimeFormat: 12,
        NumberSymbols: 13,
        NumberFormats: 14,
        CurrencySymbol: 15,
        CurrencyName: 16,
        Currencies: 17,
        PluralCase: 18,
        ExtraData: 19
    };
    LocaleDataIndex[LocaleDataIndex.LocaleId] = "LocaleId";
    LocaleDataIndex[LocaleDataIndex.DayPeriodsFormat] = "DayPeriodsFormat";
    LocaleDataIndex[LocaleDataIndex.DayPeriodsStandalone] = "DayPeriodsStandalone";
    LocaleDataIndex[LocaleDataIndex.DaysFormat] = "DaysFormat";
    LocaleDataIndex[LocaleDataIndex.DaysStandalone] = "DaysStandalone";
    LocaleDataIndex[LocaleDataIndex.MonthsFormat] = "MonthsFormat";
    LocaleDataIndex[LocaleDataIndex.MonthsStandalone] = "MonthsStandalone";
    LocaleDataIndex[LocaleDataIndex.Eras] = "Eras";
    LocaleDataIndex[LocaleDataIndex.FirstDayOfWeek] = "FirstDayOfWeek";
    LocaleDataIndex[LocaleDataIndex.WeekendRange] = "WeekendRange";
    LocaleDataIndex[LocaleDataIndex.DateFormat] = "DateFormat";
    LocaleDataIndex[LocaleDataIndex.TimeFormat] = "TimeFormat";
    LocaleDataIndex[LocaleDataIndex.DateTimeFormat] = "DateTimeFormat";
    LocaleDataIndex[LocaleDataIndex.NumberSymbols] = "NumberSymbols";
    LocaleDataIndex[LocaleDataIndex.NumberFormats] = "NumberFormats";
    LocaleDataIndex[LocaleDataIndex.CurrencySymbol] = "CurrencySymbol";
    LocaleDataIndex[LocaleDataIndex.CurrencyName] = "CurrencyName";
    LocaleDataIndex[LocaleDataIndex.Currencies] = "Currencies";
    LocaleDataIndex[LocaleDataIndex.PluralCase] = "PluralCase";
    LocaleDataIndex[LocaleDataIndex.ExtraData] = "ExtraData";
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    var u = void 0;
    function plural(n) {
        var i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, "").length;
        return 1 === i && 0 === v ? 1 : 5;
    }
    var localeEn = [ "en", [ [ "a", "p" ], [ "AM", "PM" ], u ], [ [ "AM", "PM" ], u, u ], [ [ "S", "M", "T", "W", "T", "F", "S" ], [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ], [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ], [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ] ], u, [ [ "J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D" ], [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ], [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ] ], u, [ [ "B", "A" ], [ "BC", "AD" ], [ "Before Christ", "Anno Domini" ] ], 0, [ 6, 0 ], [ "M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y" ], [ "h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz" ], [ "{1}, {0}", u, "{1} 'at' {0}", u ], [ ".", ",", ";", "%", "+", "-", "E", "×", "‰", "∞", "NaN", ":" ], [ "#,##0.###", "#,##0%", "¤#,##0.00", "#E0" ], "$", "US Dollar", {}, plural ];
    function getLocalePluralCase(locale) {
        return findLocaleData(locale)[LocaleDataIndex.PluralCase];
    }
    function findLocaleData(locale) {
        var normalizedLocale = locale.toLowerCase().replace(/_/g, "-"), match = LOCALE_DATA[normalizedLocale];
        if (match) return match;
        var parentLocale = normalizedLocale.split("-")[0];
        if (match = LOCALE_DATA[parentLocale]) return match;
        if ("en" === parentLocale) return localeEn;
        throw new Error('Missing locale data for the locale "' + locale + '".');
    }
    function getPluralCase(value, locale) {
        switch (getLocalePluralCase(locale)(value)) {
          case 0:
            return "zero";

          case 1:
            return "one";

          case 2:
            return "two";

          case 3:
            return "few";

          case 4:
            return "many";

          default:
            return "other";
        }
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    function addAllToArray(items, arr) {
        for (var i = 0; i < items.length; i++) arr.push(items[i]);
    }
    function flatten(list, dst) {
        void 0 === dst && (dst = list);
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            if (Array.isArray(item)) {
                dst === list && (dst = list.slice(0, i));
                flatten(item, dst);
            } else dst !== list && dst.push(item);
        }
        return dst;
    }
    var MARKER = "�", ICU_BLOCK_REGEXP = /^\s*(�\d+:?\d*�)\s*,\s*(select|plural)\s*,/, SUBTEMPLATE_REGEXP = /�\/?\*(\d+:\d+)�/gi, PH_REGEXP = /�(\/?[#*!]\d+):?\d*�/gi, BINDING_REGEXP = /�(\d+):?\d*�/gi, ICU_REGEXP = /({\s*�\d+:?\d*�\s*,\s*\S{6}\s*,[\s\S]*})/gi, ROOT_TEMPLATE_ID = 0, PP_MULTI_VALUE_PLACEHOLDERS_REGEXP = /\[(�.+?�?)\]/, PP_PLACEHOLDERS_REGEXP = /\[(�.+?�?)\]|(�\/?\*\d+:\d+�)/g, PP_ICU_VARS_REGEXP = /({\s*)(VAR_(PLURAL|SELECT)(_\d+)?)(\s*,)/g, PP_ICUS_REGEXP = /�I18N_EXP_(ICU(_\d+)?)�/g, PP_CLOSE_TEMPLATE_REGEXP = /\/\*/, PP_TEMPLATE_ID_REGEXP = /\d+\:(\d+)/;
    function extractParts(pattern) {
        if (!pattern) return [];
        var match, prevPos = 0, braceStack = [], results = [], braces = /[{}]/g;
        braces.lastIndex = 0;
        for (;match = braces.exec(pattern); ) {
            var pos = match.index;
            if ("}" == match[0]) {
                braceStack.pop();
                if (0 == braceStack.length) {
                    var block = pattern.substring(prevPos, pos);
                    ICU_BLOCK_REGEXP.test(block) ? results.push(parseICUBlock(block)) : results.push(block);
                    prevPos = pos + 1;
                }
            } else {
                if (0 == braceStack.length) {
                    var substring_1 = pattern.substring(prevPos, pos);
                    results.push(substring_1);
                    prevPos = pos + 1;
                }
                braceStack.push("{");
            }
        }
        var substring = pattern.substring(prevPos);
        results.push(substring);
        return results;
    }
    function parseICUBlock(pattern) {
        for (var cases = [], values = [], icuType = 1, mainBinding = 0, parts = extractParts(pattern = pattern.replace(ICU_BLOCK_REGEXP, function(str, binding, type) {
            icuType = "select" === type ? 0 : 1;
            mainBinding = parseInt(binding.substr(1), 10);
            return "";
        })), pos = 0; pos < parts.length; ) {
            var key = parts[pos++].trim();
            1 === icuType && (key = key.replace(/\s*(?:=)?(\w+)\s*/, "$1"));
            key.length && cases.push(key);
            var blocks = extractParts(parts[pos++]);
            cases.length > values.length && values.push(blocks);
        }
        assertGreaterThan(cases.indexOf("other"), -1, 'Missing key "other" in ICU statement.');
        return {
            type: icuType,
            mainBinding: mainBinding,
            cases: cases,
            values: values
        };
    }
    function removeInnerTemplateTranslation(message) {
        for (var match, tagMatched, res = "", index = 0, inTemplate = !1; null !== (match = SUBTEMPLATE_REGEXP.exec(message)); ) if (inTemplate) {
            if (match[0] === MARKER + "/*" + tagMatched + MARKER) {
                index = match.index;
                inTemplate = !1;
            }
        } else {
            res += message.substring(index, match.index + match[0].length);
            tagMatched = match[1];
            inTemplate = !0;
        }
        return res + message.substr(index);
    }
    function getTranslationForTemplate(message, subTemplateIndex) {
        if ("number" != typeof subTemplateIndex) return removeInnerTemplateTranslation(message);
        var start = message.indexOf(":" + subTemplateIndex + MARKER) + 2 + subTemplateIndex.toString().length, end = message.search(new RegExp(MARKER + "\\/\\*\\d+:" + subTemplateIndex + MARKER));
        return removeInnerTemplateTranslation(message.substring(start, end));
    }
    function generateBindingUpdateOpCodes(str, destinationNode, attrName, sanitizeFn) {
        void 0 === sanitizeFn && (sanitizeFn = null);
        for (var updateOpCodes = [ null, null ], textParts = str.split(BINDING_REGEXP), mask = 0, j = 0; j < textParts.length; j++) {
            var textValue = textParts[j];
            if (1 & j) {
                var bindingIndex = parseInt(textValue, 10);
                updateOpCodes.push(-1 - bindingIndex);
                mask |= toMaskBit(bindingIndex);
            } else "" !== textValue && updateOpCodes.push(textValue);
        }
        updateOpCodes.push(destinationNode << 2 | (attrName ? 1 : 0));
        attrName && updateOpCodes.push(attrName, sanitizeFn);
        updateOpCodes[0] = mask;
        updateOpCodes[1] = updateOpCodes.length - 2;
        return updateOpCodes;
    }
    function getBindingMask(icuExpression, mask) {
        void 0 === mask && (mask = 0);
        mask |= toMaskBit(icuExpression.mainBinding);
        for (var match, i = 0; i < icuExpression.values.length; i++) for (var valueArr = icuExpression.values[i], j = 0; j < valueArr.length; j++) {
            var value = valueArr[j];
            if ("string" == typeof value) for (;match = BINDING_REGEXP.exec(value); ) mask |= toMaskBit(parseInt(match[1], 10)); else mask = getBindingMask(value, mask);
        }
        return mask;
    }
    var i18nIndexStack = [], i18nIndexStackPointer = -1;
    function toMaskBit(bindingIndex) {
        return 1 << Math.min(bindingIndex, 31);
    }
    var i18nVarsCount, parentIndexStack = [];
    function ɵɵi18nStart(index, message, subTemplateIndex) {
        var tView = getLView()[TVIEW];
        i18nIndexStack[++i18nIndexStackPointer] = index;
        setDelayProjection(!0);
        tView.firstTemplatePass && null === tView.data[index + HEADER_OFFSET] && i18nStartFirstPass(tView, index, message, subTemplateIndex);
    }
    function i18nStartFirstPass(tView, index, message, subTemplateIndex) {
        var viewData = getLView(), startIndex = tView.blueprint.length - HEADER_OFFSET;
        i18nVarsCount = 0;
        var previousOrParentTNode = getPreviousOrParentTNode(), parentTNode = getIsParent() ? getPreviousOrParentTNode() : previousOrParentTNode && previousOrParentTNode.parent, parentIndex = parentTNode && parentTNode !== viewData[T_HOST] ? parentTNode.index - HEADER_OFFSET : index, parentIndexPointer = 0;
        parentIndexStack[parentIndexPointer] = parentIndex;
        var createOpCodes = [];
        index > 0 && previousOrParentTNode !== parentTNode && createOpCodes.push(previousOrParentTNode.index << 3 | 0);
        for (var updateOpCodes = [], icuExpressions = [], msgParts = getTranslationForTemplate(message, subTemplateIndex).split(PH_REGEXP), i = 0; i < msgParts.length; i++) {
            var value = msgParts[i];
            if (1 & i) if ("/" === value.charAt(0)) {
                if ("#" === value.charAt(1)) {
                    var phIndex = parseInt(value.substr(2), 10);
                    parentIndex = parentIndexStack[--parentIndexPointer];
                    createOpCodes.push(phIndex << 3 | 5);
                }
            } else {
                phIndex = parseInt(value.substr(1), 10);
                createOpCodes.push(phIndex << 3 | 0, parentIndex << 17 | 1);
                "#" === value.charAt(0) && (parentIndexStack[++parentIndexPointer] = parentIndex = phIndex);
            } else for (var parts = extractParts(value), j = 0; j < parts.length; j++) if (1 & j) {
                var icuNodeIndex = startIndex + i18nVarsCount++;
                createOpCodes.push(COMMENT_MARKER, "", icuNodeIndex, parentIndex << 17 | 1);
                var icuExpression = parts[j], mask = getBindingMask(icuExpression);
                icuStart(icuExpressions, icuExpression, icuNodeIndex, icuNodeIndex);
                var tIcuIndex = icuExpressions.length - 1;
                updateOpCodes.push(toMaskBit(icuExpression.mainBinding), 3, -1 - icuExpression.mainBinding, icuNodeIndex << 2 | 2, tIcuIndex, mask, 2, icuNodeIndex << 2 | 3, tIcuIndex);
            } else if ("" !== parts[j]) {
                var text = parts[j], hasBinding = text.match(BINDING_REGEXP), textNodeIndex = startIndex + i18nVarsCount++;
                createOpCodes.push(hasBinding ? "" : text, textNodeIndex, parentIndex << 17 | 1);
                hasBinding && addAllToArray(generateBindingUpdateOpCodes(text, textNodeIndex), updateOpCodes);
            }
        }
        allocExpando(viewData, i18nVarsCount);
        tView.data[index + HEADER_OFFSET] = {
            vars: i18nVarsCount,
            create: createOpCodes,
            update: updateOpCodes,
            icus: icuExpressions.length ? icuExpressions : null
        };
    }
    function appendI18nNode(tNode, parentTNode, previousTNode) {
        var nextNode = tNode.next, viewData = getLView();
        previousTNode || (previousTNode = parentTNode);
        if (previousTNode === parentTNode && tNode !== parentTNode.child) {
            tNode.next = parentTNode.child;
            parentTNode.child = tNode;
        } else if (previousTNode !== parentTNode && tNode !== previousTNode.next) {
            tNode.next = previousTNode.next;
            previousTNode.next = tNode;
        } else tNode.next = null;
        parentTNode !== viewData[T_HOST] && (tNode.parent = parentTNode);
        for (var cursor = tNode.next; cursor; ) {
            cursor.next === tNode && (cursor.next = nextNode);
            cursor = cursor.next;
        }
        if (1 === tNode.type) {
            appendProjectedNodes(viewData, tNode, tNode.projection, findComponentView(viewData));
            return tNode;
        }
        appendChild(getNativeByTNode(tNode, viewData), tNode, viewData);
        var slotValue = viewData[tNode.index];
        0 !== tNode.type && isLContainer(slotValue) && appendChild(slotValue[NATIVE], tNode, viewData);
        return tNode;
    }
    function ɵɵi18nPostprocess(message, replacements) {
        void 0 === replacements && (replacements = {});
        var result = message;
        if (PP_MULTI_VALUE_PLACEHOLDERS_REGEXP.test(message)) {
            var matches_1 = {}, templateIdsStack_1 = [ ROOT_TEMPLATE_ID ];
            result = result.replace(PP_PLACEHOLDERS_REGEXP, function(m, phs, tmpl) {
                var content = phs || tmpl, placeholders = matches_1[content] || [];
                if (!placeholders.length) {
                    content.split("|").forEach(function(placeholder) {
                        var match = placeholder.match(PP_TEMPLATE_ID_REGEXP), templateId = match ? parseInt(match[1], 10) : ROOT_TEMPLATE_ID, isCloseTemplateTag = PP_CLOSE_TEMPLATE_REGEXP.test(placeholder);
                        placeholders.push([ templateId, isCloseTemplateTag, placeholder ]);
                    });
                    matches_1[content] = placeholders;
                }
                if (!placeholders.length) throw new Error("i18n postprocess: unmatched placeholder - " + content);
                for (var currentTemplateId = templateIdsStack_1[templateIdsStack_1.length - 1], idx = 0, i = 0; i < placeholders.length; i++) if (placeholders[i][0] === currentTemplateId) {
                    idx = i;
                    break;
                }
                var _b = placeholders[idx], templateId = _b[0], placeholder = _b[2];
                _b[1] ? templateIdsStack_1.pop() : currentTemplateId !== templateId && templateIdsStack_1.push(templateId);
                placeholders.splice(idx, 1);
                return placeholder;
            });
        }
        return Object.keys(replacements).length ? result = (result = result.replace(PP_ICU_VARS_REGEXP, function(match, start, key, _type, _idx, end) {
            return replacements.hasOwnProperty(key) ? "" + start + replacements[key] + end : match;
        })).replace(PP_ICUS_REGEXP, function(match, key) {
            if (replacements.hasOwnProperty(key)) {
                var list = replacements[key];
                if (!list.length) throw new Error("i18n postprocess: unmatched ICU - " + match + " with key: " + key);
                return list.shift();
            }
            return match;
        }) : result;
    }
    function ɵɵi18nEnd() {
        i18nEndFirstPass(getLView()[TVIEW]);
        setDelayProjection(!1);
    }
    function i18nEndFirstPass(tView) {
        for (var viewData = getLView(), rootIndex = i18nIndexStack[i18nIndexStackPointer--], tI18n = tView.data[rootIndex + HEADER_OFFSET], lastCreatedNode = getPreviousOrParentTNode(), visitedNodes = readCreateOpCodes(rootIndex, tI18n.create, tI18n.icus, viewData), i = rootIndex + 1; i <= lastCreatedNode.index - HEADER_OFFSET; i++) -1 === visitedNodes.indexOf(i) && removeNode(i, viewData);
    }
    function createDynamicNodeAtIndex(lView, index, type, native, name) {
        var previousOrParentTNode = getPreviousOrParentTNode();
        lView[index + HEADER_OFFSET] = native;
        var tNode = getOrCreateTNode(lView[TVIEW], lView[T_HOST], index, type, name, null);
        previousOrParentTNode.next === tNode && (previousOrParentTNode.next = null);
        return tNode;
    }
    function readCreateOpCodes(index, createOpCodes, icus, viewData) {
        for (var renderer = getLView()[RENDERER], currentTNode = null, previousTNode = null, visitedNodes = [], i = 0; i < createOpCodes.length; i++) {
            var opCode = createOpCodes[i];
            if ("string" == typeof opCode) {
                var textRNode = createTextNode(opCode, renderer), textNodeIndex = createOpCodes[++i];
                previousTNode = currentTNode;
                currentTNode = createDynamicNodeAtIndex(viewData, textNodeIndex, 3, textRNode, null);
                visitedNodes.push(textNodeIndex);
                setIsNotParent();
            } else if ("number" == typeof opCode) switch (7 & opCode) {
              case 1:
                var destinationNodeIndex = opCode >>> 17;
                previousTNode = appendI18nNode(currentTNode, destinationNodeIndex === index ? viewData[T_HOST] : getTNode(destinationNodeIndex, viewData), previousTNode);
                break;

              case 0:
                var nodeIndex = opCode >>> 3;
                visitedNodes.push(nodeIndex);
                previousTNode = currentTNode;
                (currentTNode = getTNode(nodeIndex, viewData)) && setPreviousOrParentTNode(currentTNode, 3 === currentTNode.type);
                break;

              case 5:
                previousTNode = currentTNode = getTNode(opCode >>> 3, viewData);
                setPreviousOrParentTNode(currentTNode, !1);
                break;

              case 4:
                elementAttributeInternal(elementNodeIndex = opCode >>> 3, createOpCodes[++i], createOpCodes[++i], viewData, viewData[RENDERER]);
                break;

              default:
                throw new Error('Unable to determine the type of mutate operation for "' + opCode + '"');
            } else switch (opCode) {
              case COMMENT_MARKER:
                var commentValue = createOpCodes[++i], commentNodeIndex = createOpCodes[++i], commentRNode = renderer.createComment(commentValue);
                previousTNode = currentTNode;
                currentTNode = createDynamicNodeAtIndex(viewData, commentNodeIndex, 5, commentRNode, null);
                visitedNodes.push(commentNodeIndex);
                attachPatchData(commentRNode, viewData);
                currentTNode.activeCaseIndex = null;
                setIsNotParent();
                break;

              case ELEMENT_MARKER:
                var elementNodeIndex, tagNameValue = createOpCodes[++i];
                previousTNode = currentTNode;
                currentTNode = createDynamicNodeAtIndex(viewData, elementNodeIndex = createOpCodes[++i], 3, renderer.createElement(tagNameValue), tagNameValue);
                visitedNodes.push(elementNodeIndex);
                break;

              default:
                throw new Error('Unable to determine the type of mutate operation for "' + opCode + '"');
            }
        }
        setIsNotParent();
        return visitedNodes;
    }
    function readUpdateOpCodes(updateOpCodes, icus, bindingsStartIndex, changeMask, viewData, bypassCheckBit) {
        void 0 === bypassCheckBit && (bypassCheckBit = !1);
        for (var caseCreated = !1, i = 0; i < updateOpCodes.length; i++) {
            var checkBit = updateOpCodes[i], skipCodes = updateOpCodes[++i];
            if (bypassCheckBit || checkBit & changeMask) for (var value = "", j = i + 1; j <= i + skipCodes; j++) {
                var opCode = updateOpCodes[j];
                if ("string" == typeof opCode) value += opCode; else if ("number" == typeof opCode) if (opCode < 0) value += renderStringify(viewData[bindingsStartIndex - opCode]); else {
                    var nodeIndex = opCode >>> 2, tIcu = void 0, icuTNode = void 0;
                    switch (3 & opCode) {
                      case 1:
                        elementPropertyInternal(nodeIndex, updateOpCodes[++j], value, updateOpCodes[++j]);
                        break;

                      case 0:
                        ɵɵtextBinding(nodeIndex, value);
                        break;

                      case 2:
                        tIcu = icus[updateOpCodes[++j]];
                        if (null !== (icuTNode = getTNode(nodeIndex, viewData)).activeCaseIndex) for (var removeCodes = tIcu.remove[icuTNode.activeCaseIndex], k = 0; k < removeCodes.length; k++) {
                            var removeOpCode = removeCodes[k];
                            switch (7 & removeOpCode) {
                              case 3:
                                removeNode(removeOpCode >>> 3, viewData);
                                break;

                              case 6:
                                var activeIndex = getTNode(removeCodes[k + 1] >>> 3, viewData).activeCaseIndex;
                                null !== activeIndex && addAllToArray(icus[removeOpCode >>> 3].remove[activeIndex], removeCodes);
                            }
                        }
                        var caseIndex = getCaseIndex(tIcu, value);
                        icuTNode.activeCaseIndex = -1 !== caseIndex ? caseIndex : null;
                        readCreateOpCodes(-1, tIcu.create[caseIndex], icus, viewData);
                        caseCreated = !0;
                        break;

                      case 3:
                        tIcu = icus[updateOpCodes[++j]];
                        icuTNode = getTNode(nodeIndex, viewData);
                        readUpdateOpCodes(tIcu.update[icuTNode.activeCaseIndex], icus, bindingsStartIndex, changeMask, viewData, caseCreated);
                    }
                }
            }
            i += skipCodes;
        }
    }
    function removeNode(index, viewData) {
        var removedPhTNode = getTNode(index, viewData), removedPhRNode = getNativeByIndex(index, viewData);
        removedPhRNode && nativeRemoveNode(viewData[RENDERER], removedPhRNode);
        var slotValue = ɵɵload(index);
        isLContainer(slotValue) && 0 !== removedPhTNode.type && nativeRemoveNode(viewData[RENDERER], slotValue[NATIVE]);
    }
    function ɵɵi18n(index, message, subTemplateIndex) {
        ɵɵi18nStart(index, message, subTemplateIndex);
        ɵɵi18nEnd();
    }
    function ɵɵi18nAttributes(index, values) {
        var tView = getLView()[TVIEW];
        tView.firstTemplatePass && null === tView.data[index + HEADER_OFFSET] && i18nAttributesFirstPass(tView, index, values);
    }
    function i18nAttributesFirstPass(tView, index, values) {
        for (var previousElementIndex = getPreviousOrParentTNode().index - HEADER_OFFSET, updateOpCodes = [], i = 0; i < values.length; i += 2) for (var attrName = values[i], parts = values[i + 1].split(ICU_REGEXP), j = 0; j < parts.length; j++) {
            var value = parts[j];
            if (1 & j) throw new Error("ICU expressions are not yet supported in attributes");
            if ("" !== value) if (value.match(BINDING_REGEXP)) addAllToArray(generateBindingUpdateOpCodes(value, previousElementIndex, attrName), updateOpCodes); else {
                var lView_6 = getLView();
                elementAttributeInternal(previousElementIndex, attrName, value, lView_6, lView_6[RENDERER]);
                var tNode = getTNode(previousElementIndex, lView_6), dataValue = tNode.inputs && tNode.inputs[attrName];
                dataValue && setInputsForProperty(lView_6, dataValue, value);
            }
        }
        tView.data[index + HEADER_OFFSET] = updateOpCodes;
    }
    var changeMask = 0, shiftsCounter = 0;
    function ɵɵi18nExp(expression) {
        expression !== NO_CHANGE && (changeMask |= 1 << shiftsCounter);
        shiftsCounter++;
    }
    function ɵɵi18nApply(index) {
        if (shiftsCounter) {
            var lView_7 = getLView(), tI18n = lView_7[TVIEW].data[index + HEADER_OFFSET], updateOpCodes = void 0, icus = null;
            if (Array.isArray(tI18n)) updateOpCodes = tI18n; else {
                updateOpCodes = tI18n.update;
                icus = tI18n.icus;
            }
            readUpdateOpCodes(updateOpCodes, icus, lView_7[BINDING_INDEX] - shiftsCounter - 1, changeMask, lView_7);
            changeMask = 0;
            shiftsCounter = 0;
        }
    }
    function getCaseIndex(icuExpression, bindingValue) {
        var index = icuExpression.cases.indexOf(bindingValue);
        if (-1 === index) switch (icuExpression.type) {
          case 1:
            var resolvedCase = getPluralCase(bindingValue, getLocaleId());
            -1 === (index = icuExpression.cases.indexOf(resolvedCase)) && "other" !== resolvedCase && (index = icuExpression.cases.indexOf("other"));
            break;

          case 0:
            index = icuExpression.cases.indexOf("other");
        }
        return index;
    }
    function icuStart(tIcus, icuExpression, startIndex, expandoStartIndex) {
        for (var createCodes = [], removeCodes = [], updateCodes = [], vars = [], childIcus = [], i = 0; i < icuExpression.values.length; i++) {
            for (var valueArr = icuExpression.values[i], nestedIcus = [], j = 0; j < valueArr.length; j++) {
                var value = valueArr[j];
                if ("string" != typeof value) {
                    var icuIndex = nestedIcus.push(value) - 1;
                    valueArr[j] = "\x3c!--�" + icuIndex + "�--\x3e";
                }
            }
            var icuCase = parseIcuCase(valueArr.join(""), startIndex, nestedIcus, tIcus, expandoStartIndex);
            createCodes.push(icuCase.create);
            removeCodes.push(icuCase.remove);
            updateCodes.push(icuCase.update);
            vars.push(icuCase.vars);
            childIcus.push(icuCase.childIcus);
        }
        tIcus.push({
            type: icuExpression.type,
            vars: vars,
            childIcus: childIcus,
            cases: icuExpression.cases,
            create: createCodes,
            remove: removeCodes,
            update: updateCodes
        });
        i18nVarsCount += Math.max.apply(Math, vars);
    }
    function parseIcuCase(unsafeHtml, parentIndex, nestedIcus, tIcus, expandoStartIndex) {
        var inertBodyElement = new InertBodyHelper(document).getInertBodyElement(unsafeHtml);
        if (!inertBodyElement) throw new Error("Unable to generate inert body element");
        var opCodes = {
            vars: 0,
            childIcus: [],
            create: [],
            remove: [],
            update: []
        };
        parseNodes((getTemplateContent(inertBodyElement) || inertBodyElement).firstChild, opCodes, parentIndex, nestedIcus, tIcus, expandoStartIndex);
        return opCodes;
    }
    var NESTED_ICU = /�(\d+)�/;
    function parseNodes(currentNode, icuCase, parentIndex, nestedIcus, tIcus, expandoStartIndex) {
        if (currentNode) {
            for (var nestedIcusToCreate = []; currentNode; ) {
                var nextNode = currentNode.nextSibling, newIndex = expandoStartIndex + ++icuCase.vars;
                switch (currentNode.nodeType) {
                  case Node.ELEMENT_NODE:
                    var element = currentNode, tagName = element.tagName.toLowerCase();
                    if (VALID_ELEMENTS.hasOwnProperty(tagName)) {
                        icuCase.create.push(ELEMENT_MARKER, tagName, newIndex, parentIndex << 17 | 1);
                        for (var elAttrs = element.attributes, i = 0; i < elAttrs.length; i++) {
                            var attr = elAttrs.item(i), lowerAttrName = attr.name.toLowerCase();
                            attr.value.match(BINDING_REGEXP) ? VALID_ATTRS.hasOwnProperty(lowerAttrName) && addAllToArray(URI_ATTRS[lowerAttrName] ? generateBindingUpdateOpCodes(attr.value, newIndex, attr.name, _sanitizeUrl) : SRCSET_ATTRS[lowerAttrName] ? generateBindingUpdateOpCodes(attr.value, newIndex, attr.name, sanitizeSrcset) : generateBindingUpdateOpCodes(attr.value, newIndex, attr.name), icuCase.update) : icuCase.create.push(newIndex << 3 | 4, attr.name, attr.value);
                        }
                        parseNodes(currentNode.firstChild, icuCase, newIndex, nestedIcus, tIcus, expandoStartIndex);
                        icuCase.remove.push(newIndex << 3 | 3);
                    } else icuCase.vars--;
                    break;

                  case Node.TEXT_NODE:
                    var value = currentNode.textContent || "", hasBinding = value.match(BINDING_REGEXP);
                    icuCase.create.push(hasBinding ? "" : value, newIndex, parentIndex << 17 | 1);
                    icuCase.remove.push(newIndex << 3 | 3);
                    hasBinding && addAllToArray(generateBindingUpdateOpCodes(value, newIndex), icuCase.update);
                    break;

                  case Node.COMMENT_NODE:
                    var match = NESTED_ICU.exec(currentNode.textContent || "");
                    if (match) {
                        var nestedIcuIndex = parseInt(match[1], 10);
                        icuCase.create.push(COMMENT_MARKER, "", newIndex, parentIndex << 17 | 1);
                        nestedIcusToCreate.push([ nestedIcu = nestedIcus[nestedIcuIndex], newIndex ]);
                    } else icuCase.vars--;
                    break;

                  default:
                    icuCase.vars--;
                }
                currentNode = nextNode;
            }
            for (i = 0; i < nestedIcusToCreate.length; i++) {
                var nestedIcu, nestedIcuNodeIndex = nestedIcusToCreate[i][1];
                icuStart(tIcus, nestedIcu = nestedIcusToCreate[i][0], nestedIcuNodeIndex, expandoStartIndex + icuCase.vars);
                var nestTIcuIndex = tIcus.length - 1;
                icuCase.vars += Math.max.apply(Math, tIcus[nestTIcuIndex].vars);
                icuCase.childIcus.push(nestTIcuIndex);
                var mask = getBindingMask(nestedIcu);
                icuCase.update.push(toMaskBit(nestedIcu.mainBinding), 3, -1 - nestedIcu.mainBinding, nestedIcuNodeIndex << 2 | 2, nestTIcuIndex, mask, 2, nestedIcuNodeIndex << 2 | 3, nestTIcuIndex);
                icuCase.remove.push(nestTIcuIndex << 3 | 6, nestedIcuNodeIndex << 3 | 3);
            }
        }
    }
    var TRANSLATIONS = {}, LOCALIZE_PH_REGEXP = /\{\$(.*?)\}/g;
    function ɵɵi18nLocalize(input, placeholders) {
        void 0 === placeholders && (placeholders = {});
        void 0 !== TRANSLATIONS[input] && (input = TRANSLATIONS[input]);
        return Object.keys(placeholders).length ? input.replace(LOCALIZE_PH_REGEXP, function(match, key) {
            return placeholders[key] || "";
        }) : input;
    }
    var DEFAULT_LOCALE_ID = "en-US", LOCALE_ID = DEFAULT_LOCALE_ID;
    function setLocaleId(localeId) {
        LOCALE_ID = localeId.toLowerCase().replace(/_/g, "-");
    }
    function getLocaleId() {
        return LOCALE_ID;
    }
    var modules = new Map();
    function assertSameOrNotExisting(id, type, incoming) {
        if (type && type !== incoming) throw new Error("Duplicate module registered for " + id + " - " + stringify(type) + " vs " + stringify(type.name));
    }
    function registerNgModuleType(ngModuleType) {
        if (null !== ngModuleType.ngModuleDef.id) {
            var id = ngModuleType.ngModuleDef.id;
            assertSameOrNotExisting(id, modules.get(id), ngModuleType);
            modules.set(id, ngModuleType);
        }
        var imports = ngModuleType.ngModuleDef.imports;
        imports instanceof Function && (imports = imports());
        imports && imports.forEach(function(i) {
            return registerNgModuleType(i);
        });
    }
    var COMPONENT_FACTORY_RESOLVER = {
        provide: ComponentFactoryResolver,
        useClass: ComponentFactoryResolver$1,
        deps: [ NgModuleRef ]
    }, NgModuleRef$1 = function(_super) {
        __extends(NgModuleRef$1, _super);
        function NgModuleRef$1(ngModuleType, _parent) {
            var _this = _super.call(this) || this;
            _this._parent = _parent;
            _this._bootstrapComponents = [];
            _this.injector = _this;
            _this.destroyCbs = [];
            var ngModuleDef = getNgModuleDef(ngModuleType), ngLocaleIdDef = getNgLocaleIdDef(ngModuleType);
            ngLocaleIdDef && setLocaleId(ngLocaleIdDef);
            _this._bootstrapComponents = maybeUnwrapFn(ngModuleDef.bootstrap);
            _this._r3Injector = createInjector(ngModuleType, _parent, [ {
                provide: NgModuleRef,
                useValue: _this
            }, COMPONENT_FACTORY_RESOLVER ], stringify(ngModuleType));
            _this.instance = _this.get(ngModuleType);
            return _this;
        }
        NgModuleRef$1.prototype.get = function(token, notFoundValue, injectFlags) {
            void 0 === notFoundValue && (notFoundValue = Injector.THROW_IF_NOT_FOUND);
            void 0 === injectFlags && (injectFlags = InjectFlags.Default);
            return token === Injector || token === NgModuleRef || token === INJECTOR ? this : this._r3Injector.get(token, notFoundValue, injectFlags);
        };
        Object.defineProperty(NgModuleRef$1.prototype, "componentFactoryResolver", {
            get: function() {
                return this.get(ComponentFactoryResolver);
            },
            enumerable: !0,
            configurable: !0
        });
        NgModuleRef$1.prototype.destroy = function() {
            var injector = this._r3Injector;
            !injector.destroyed && injector.destroy();
            this.destroyCbs.forEach(function(fn) {
                return fn();
            });
            this.destroyCbs = null;
        };
        NgModuleRef$1.prototype.onDestroy = function(callback) {
            this.destroyCbs.push(callback);
        };
        return NgModuleRef$1;
    }(NgModuleRef), NgModuleFactory$1 = function(_super) {
        __extends(NgModuleFactory$1, _super);
        function NgModuleFactory$1(moduleType) {
            var _this = _super.call(this) || this;
            _this.moduleType = moduleType;
            null !== getNgModuleDef(moduleType) && registerNgModuleType(moduleType);
            return _this;
        }
        NgModuleFactory$1.prototype.create = function(parentInjector) {
            return new NgModuleRef$1(this.moduleType, parentInjector);
        };
        return NgModuleFactory$1;
    }(NgModuleFactory);
    function ɵɵpureFunction0(slotOffset, pureFn, thisArg) {
        var bindingIndex = getBindingRoot() + slotOffset, lView = getLView();
        return isCreationMode() ? updateBinding(lView, bindingIndex, thisArg ? pureFn.call(thisArg) : pureFn()) : getBinding(lView, bindingIndex);
    }
    function ɵɵpureFunction1(slotOffset, pureFn, exp, thisArg) {
        var lView = getLView(), bindingIndex = getBindingRoot() + slotOffset;
        return bindingUpdated(lView, bindingIndex, exp) ? updateBinding(lView, bindingIndex + 1, thisArg ? pureFn.call(thisArg, exp) : pureFn(exp)) : getBinding(lView, bindingIndex + 1);
    }
    function ɵɵpureFunction2(slotOffset, pureFn, exp1, exp2, thisArg) {
        var bindingIndex = getBindingRoot() + slotOffset, lView = getLView();
        return bindingUpdated2(lView, bindingIndex, exp1, exp2) ? updateBinding(lView, bindingIndex + 2, thisArg ? pureFn.call(thisArg, exp1, exp2) : pureFn(exp1, exp2)) : getBinding(lView, bindingIndex + 2);
    }
    function ɵɵpureFunction3(slotOffset, pureFn, exp1, exp2, exp3, thisArg) {
        var bindingIndex = getBindingRoot() + slotOffset, lView = getLView();
        return bindingUpdated3(lView, bindingIndex, exp1, exp2, exp3) ? updateBinding(lView, bindingIndex + 3, thisArg ? pureFn.call(thisArg, exp1, exp2, exp3) : pureFn(exp1, exp2, exp3)) : getBinding(lView, bindingIndex + 3);
    }
    function ɵɵpureFunction4(slotOffset, pureFn, exp1, exp2, exp3, exp4, thisArg) {
        var bindingIndex = getBindingRoot() + slotOffset, lView = getLView();
        return bindingUpdated4(lView, bindingIndex, exp1, exp2, exp3, exp4) ? updateBinding(lView, bindingIndex + 4, thisArg ? pureFn.call(thisArg, exp1, exp2, exp3, exp4) : pureFn(exp1, exp2, exp3, exp4)) : getBinding(lView, bindingIndex + 4);
    }
    function ɵɵpureFunction5(slotOffset, pureFn, exp1, exp2, exp3, exp4, exp5, thisArg) {
        var bindingIndex = getBindingRoot() + slotOffset, lView = getLView(), different = bindingUpdated4(lView, bindingIndex, exp1, exp2, exp3, exp4);
        return bindingUpdated(lView, bindingIndex + 4, exp5) || different ? updateBinding(lView, bindingIndex + 5, thisArg ? pureFn.call(thisArg, exp1, exp2, exp3, exp4, exp5) : pureFn(exp1, exp2, exp3, exp4, exp5)) : getBinding(lView, bindingIndex + 5);
    }
    function ɵɵpureFunction6(slotOffset, pureFn, exp1, exp2, exp3, exp4, exp5, exp6, thisArg) {
        var bindingIndex = getBindingRoot() + slotOffset, lView = getLView(), different = bindingUpdated4(lView, bindingIndex, exp1, exp2, exp3, exp4);
        return bindingUpdated2(lView, bindingIndex + 4, exp5, exp6) || different ? updateBinding(lView, bindingIndex + 6, thisArg ? pureFn.call(thisArg, exp1, exp2, exp3, exp4, exp5, exp6) : pureFn(exp1, exp2, exp3, exp4, exp5, exp6)) : getBinding(lView, bindingIndex + 6);
    }
    function ɵɵpureFunction7(slotOffset, pureFn, exp1, exp2, exp3, exp4, exp5, exp6, exp7, thisArg) {
        var bindingIndex = getBindingRoot() + slotOffset, lView = getLView(), different = bindingUpdated4(lView, bindingIndex, exp1, exp2, exp3, exp4);
        return bindingUpdated3(lView, bindingIndex + 4, exp5, exp6, exp7) || different ? updateBinding(lView, bindingIndex + 7, thisArg ? pureFn.call(thisArg, exp1, exp2, exp3, exp4, exp5, exp6, exp7) : pureFn(exp1, exp2, exp3, exp4, exp5, exp6, exp7)) : getBinding(lView, bindingIndex + 7);
    }
    function ɵɵpureFunction8(slotOffset, pureFn, exp1, exp2, exp3, exp4, exp5, exp6, exp7, exp8, thisArg) {
        var bindingIndex = getBindingRoot() + slotOffset, lView = getLView(), different = bindingUpdated4(lView, bindingIndex, exp1, exp2, exp3, exp4);
        return bindingUpdated4(lView, bindingIndex + 4, exp5, exp6, exp7, exp8) || different ? updateBinding(lView, bindingIndex + 8, thisArg ? pureFn.call(thisArg, exp1, exp2, exp3, exp4, exp5, exp6, exp7, exp8) : pureFn(exp1, exp2, exp3, exp4, exp5, exp6, exp7, exp8)) : getBinding(lView, bindingIndex + 8);
    }
    function ɵɵpureFunctionV(slotOffset, pureFn, exps, thisArg) {
        for (var bindingIndex = getBindingRoot() + slotOffset, different = !1, lView = getLView(), i = 0; i < exps.length; i++) bindingUpdated(lView, bindingIndex++, exps[i]) && (different = !0);
        return different ? updateBinding(lView, bindingIndex, pureFn.apply(thisArg, exps)) : getBinding(lView, bindingIndex);
    }
    function ɵɵpipe(index, pipeName) {
        var pipeDef, tView = getLView()[TVIEW], adjustedIndex = index + HEADER_OFFSET;
        if (tView.firstTemplatePass) {
            pipeDef = getPipeDef$1(pipeName, tView.pipeRegistry);
            tView.data[adjustedIndex] = pipeDef;
            pipeDef.onDestroy && (tView.destroyHooks || (tView.destroyHooks = [])).push(adjustedIndex, pipeDef.onDestroy);
        } else pipeDef = tView.data[adjustedIndex];
        var pipeInstance = pipeDef.factory();
        store(index, pipeInstance);
        return pipeInstance;
    }
    function getPipeDef$1(name, registry) {
        if (registry) for (var i = registry.length - 1; i >= 0; i--) {
            var pipeDef = registry[i];
            if (name === pipeDef.name) return pipeDef;
        }
        throw new Error("The pipe '" + name + "' could not be found!");
    }
    function ɵɵpipeBind1(index, slotOffset, v1) {
        var pipeInstance = ɵɵload(index);
        return unwrapValue(isPure(index) ? ɵɵpureFunction1(slotOffset, pipeInstance.transform, v1, pipeInstance) : pipeInstance.transform(v1));
    }
    function ɵɵpipeBind2(index, slotOffset, v1, v2) {
        var pipeInstance = ɵɵload(index);
        return unwrapValue(isPure(index) ? ɵɵpureFunction2(slotOffset, pipeInstance.transform, v1, v2, pipeInstance) : pipeInstance.transform(v1, v2));
    }
    function ɵɵpipeBind3(index, slotOffset, v1, v2, v3) {
        var pipeInstance = ɵɵload(index);
        return unwrapValue(isPure(index) ? ɵɵpureFunction3(slotOffset, pipeInstance.transform, v1, v2, v3, pipeInstance) : pipeInstance.transform(v1, v2, v3));
    }
    function ɵɵpipeBind4(index, slotOffset, v1, v2, v3, v4) {
        var pipeInstance = ɵɵload(index);
        return unwrapValue(isPure(index) ? ɵɵpureFunction4(slotOffset, pipeInstance.transform, v1, v2, v3, v4, pipeInstance) : pipeInstance.transform(v1, v2, v3, v4));
    }
    function ɵɵpipeBindV(index, slotOffset, values) {
        var pipeInstance = ɵɵload(index);
        return unwrapValue(isPure(index) ? ɵɵpureFunctionV(slotOffset, pipeInstance.transform, values, pipeInstance) : pipeInstance.transform.apply(pipeInstance, values));
    }
    function isPure(index) {
        return getLView()[TVIEW].data[index + HEADER_OFFSET].pure;
    }
    function unwrapValue(newValue) {
        if (WrappedValue.isWrapped(newValue)) {
            newValue = WrappedValue.unwrap(newValue);
            var lView_8 = getLView();
            lView_8[lView_8[BINDING_INDEX]] = NO_CHANGE;
        }
        return newValue;
    }
    function isFunction(x) {
        return "function" == typeof x;
    }
    var _enable_super_gross_mode_that_will_cause_bad_things = !1, config = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(value) {
            if (value) {
                var error = new Error();
                console.warn("DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" + error.stack);
            } else _enable_super_gross_mode_that_will_cause_bad_things && console.log("RxJS: Back to a better error behavior. Thank you. <3");
            _enable_super_gross_mode_that_will_cause_bad_things = value;
        },
        get useDeprecatedSynchronousErrorHandling() {
            return _enable_super_gross_mode_that_will_cause_bad_things;
        }
    };
    function hostReportError(err) {
        setTimeout(function() {
            throw err;
        });
    }
    var empty = {
        closed: !0,
        next: function(value) {},
        error: function(err) {
            if (config.useDeprecatedSynchronousErrorHandling) throw err;
            hostReportError(err);
        },
        complete: function() {}
    }, isArray = Array.isArray || function(x) {
        return x && "number" == typeof x.length;
    };
    function isObject(x) {
        return null !== x && "object" == typeof x;
    }
    function UnsubscriptionErrorImpl(errors) {
        Error.call(this);
        this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
            return i + 1 + ") " + err.toString();
        }).join("\n  ") : "";
        this.name = "UnsubscriptionError";
        this.errors = errors;
        return this;
    }
    UnsubscriptionErrorImpl.prototype = Object.create(Error.prototype);
    var UnsubscriptionError = UnsubscriptionErrorImpl, Subscription = function() {
        function Subscription(unsubscribe) {
            this.closed = !1;
            this._parent = null;
            this._parents = null;
            this._subscriptions = null;
            unsubscribe && (this._unsubscribe = unsubscribe);
        }
        Subscription.prototype.unsubscribe = function() {
            var errors, hasErrors = !1;
            if (!this.closed) {
                var _b = this, _parent = _b._parent, _parents = _b._parents, _unsubscribe = _b._unsubscribe, _subscriptions = _b._subscriptions;
                this.closed = !0;
                this._parent = null;
                this._parents = null;
                this._subscriptions = null;
                for (var index = -1, len = _parents ? _parents.length : 0; _parent; ) {
                    _parent.remove(this);
                    _parent = ++index < len && _parents[index] || null;
                }
                if (isFunction(_unsubscribe)) try {
                    _unsubscribe.call(this);
                } catch (e) {
                    hasErrors = !0;
                    errors = e instanceof UnsubscriptionError ? flattenUnsubscriptionErrors(e.errors) : [ e ];
                }
                if (isArray(_subscriptions)) {
                    index = -1;
                    len = _subscriptions.length;
                    for (;++index < len; ) {
                        var sub = _subscriptions[index];
                        if (isObject(sub)) try {
                            sub.unsubscribe();
                        } catch (e) {
                            hasErrors = !0;
                            errors = errors || [];
                            e instanceof UnsubscriptionError ? errors = errors.concat(flattenUnsubscriptionErrors(e.errors)) : errors.push(e);
                        }
                    }
                }
                if (hasErrors) throw new UnsubscriptionError(errors);
            }
        };
        Subscription.prototype.add = function(teardown) {
            var subscription = teardown;
            switch (typeof teardown) {
              case "function":
                subscription = new Subscription(teardown);

              case "object":
                if (subscription === this || subscription.closed || "function" != typeof subscription.unsubscribe) return subscription;
                if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                if (!(subscription instanceof Subscription)) {
                    var tmp = subscription;
                    (subscription = new Subscription())._subscriptions = [ tmp ];
                }
                break;

              default:
                if (!teardown) return Subscription.EMPTY;
                throw new Error("unrecognized teardown " + teardown + " added to Subscription.");
            }
            if (subscription._addParent(this)) {
                var subscriptions = this._subscriptions;
                subscriptions ? subscriptions.push(subscription) : this._subscriptions = [ subscription ];
            }
            return subscription;
        };
        Subscription.prototype.remove = function(subscription) {
            var subscriptions = this._subscriptions;
            if (subscriptions) {
                var subscriptionIndex = subscriptions.indexOf(subscription);
                -1 !== subscriptionIndex && subscriptions.splice(subscriptionIndex, 1);
            }
        };
        Subscription.prototype._addParent = function(parent) {
            var _b = this, _parent = _b._parent, _parents = _b._parents;
            if (_parent === parent) return !1;
            if (!_parent) {
                this._parent = parent;
                return !0;
            }
            if (!_parents) {
                this._parents = [ parent ];
                return !0;
            }
            if (-1 === _parents.indexOf(parent)) {
                _parents.push(parent);
                return !0;
            }
            return !1;
        };
        return Subscription;
    }();
    Subscription.EMPTY = function(empty) {
        empty.closed = !0;
        return empty;
    }(new Subscription());
    function flattenUnsubscriptionErrors(errors) {
        return errors.reduce(function(errs, err) {
            return errs.concat(err instanceof UnsubscriptionError ? err.errors : err);
        }, []);
    }
    var rxSubscriber = "function" == typeof Symbol ? Symbol("rxSubscriber") : "@@rxSubscriber_" + Math.random(), Subscriber = function(_super) {
        __extends(Subscriber, _super);
        function Subscriber(destinationOrNext, error, complete) {
            var _this = _super.call(this) || this;
            _this.syncErrorValue = null;
            _this.syncErrorThrown = !1;
            _this.syncErrorThrowable = !1;
            _this.isStopped = !1;
            switch (arguments.length) {
              case 0:
                _this.destination = empty;
                break;

              case 1:
                if (!destinationOrNext) {
                    _this.destination = empty;
                    break;
                }
                if ("object" == typeof destinationOrNext) {
                    if (destinationOrNext instanceof Subscriber) {
                        _this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
                        _this.destination = destinationOrNext;
                        destinationOrNext.add(_this);
                    } else {
                        _this.syncErrorThrowable = !0;
                        _this.destination = new SafeSubscriber(_this, destinationOrNext);
                    }
                    break;
                }

              default:
                _this.syncErrorThrowable = !0;
                _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
            }
            return _this;
        }
        Subscriber.prototype[rxSubscriber] = function() {
            return this;
        };
        Subscriber.create = function(next, error, complete) {
            var subscriber = new Subscriber(next, error, complete);
            subscriber.syncErrorThrowable = !1;
            return subscriber;
        };
        Subscriber.prototype.next = function(value) {
            this.isStopped || this._next(value);
        };
        Subscriber.prototype.error = function(err) {
            if (!this.isStopped) {
                this.isStopped = !0;
                this._error(err);
            }
        };
        Subscriber.prototype.complete = function() {
            if (!this.isStopped) {
                this.isStopped = !0;
                this._complete();
            }
        };
        Subscriber.prototype.unsubscribe = function() {
            if (!this.closed) {
                this.isStopped = !0;
                _super.prototype.unsubscribe.call(this);
            }
        };
        Subscriber.prototype._next = function(value) {
            this.destination.next(value);
        };
        Subscriber.prototype._error = function(err) {
            this.destination.error(err);
            this.unsubscribe();
        };
        Subscriber.prototype._complete = function() {
            this.destination.complete();
            this.unsubscribe();
        };
        Subscriber.prototype._unsubscribeAndRecycle = function() {
            var _b = this, _parent = _b._parent, _parents = _b._parents;
            this._parent = null;
            this._parents = null;
            this.unsubscribe();
            this.closed = !1;
            this.isStopped = !1;
            this._parent = _parent;
            this._parents = _parents;
            return this;
        };
        return Subscriber;
    }(Subscription), SafeSubscriber = function(_super) {
        __extends(SafeSubscriber, _super);
        function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
            var next, _this = _super.call(this) || this;
            _this._parentSubscriber = _parentSubscriber;
            var context = _this;
            if (isFunction(observerOrNext)) next = observerOrNext; else if (observerOrNext) {
                next = observerOrNext.next;
                error = observerOrNext.error;
                complete = observerOrNext.complete;
                if (observerOrNext !== empty) {
                    isFunction((context = Object.create(observerOrNext)).unsubscribe) && _this.add(context.unsubscribe.bind(context));
                    context.unsubscribe = _this.unsubscribe.bind(_this);
                }
            }
            _this._context = context;
            _this._next = next;
            _this._error = error;
            _this._complete = complete;
            return _this;
        }
        SafeSubscriber.prototype.next = function(value) {
            if (!this.isStopped && this._next) {
                var _parentSubscriber = this._parentSubscriber;
                config.useDeprecatedSynchronousErrorHandling && _parentSubscriber.syncErrorThrowable ? this.__tryOrSetError(_parentSubscriber, this._next, value) && this.unsubscribe() : this.__tryOrUnsub(this._next, value);
            }
        };
        SafeSubscriber.prototype.error = function(err) {
            if (!this.isStopped) {
                var _parentSubscriber = this._parentSubscriber, useDeprecatedSynchronousErrorHandling = config.useDeprecatedSynchronousErrorHandling;
                if (this._error) if (useDeprecatedSynchronousErrorHandling && _parentSubscriber.syncErrorThrowable) {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                } else {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                } else if (_parentSubscriber.syncErrorThrowable) {
                    if (useDeprecatedSynchronousErrorHandling) {
                        _parentSubscriber.syncErrorValue = err;
                        _parentSubscriber.syncErrorThrown = !0;
                    } else hostReportError(err);
                    this.unsubscribe();
                } else {
                    this.unsubscribe();
                    if (useDeprecatedSynchronousErrorHandling) throw err;
                    hostReportError(err);
                }
            }
        };
        SafeSubscriber.prototype.complete = function() {
            var _this = this;
            if (!this.isStopped) {
                var _parentSubscriber = this._parentSubscriber;
                if (this._complete) {
                    var wrappedComplete = function() {
                        return _this._complete.call(_this._context);
                    };
                    if (config.useDeprecatedSynchronousErrorHandling && _parentSubscriber.syncErrorThrowable) {
                        this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                        this.unsubscribe();
                    } else {
                        this.__tryOrUnsub(wrappedComplete);
                        this.unsubscribe();
                    }
                } else this.unsubscribe();
            }
        };
        SafeSubscriber.prototype.__tryOrUnsub = function(fn, value) {
            try {
                fn.call(this._context, value);
            } catch (err) {
                this.unsubscribe();
                if (config.useDeprecatedSynchronousErrorHandling) throw err;
                hostReportError(err);
            }
        };
        SafeSubscriber.prototype.__tryOrSetError = function(parent, fn, value) {
            if (!config.useDeprecatedSynchronousErrorHandling) throw new Error("bad call");
            try {
                fn.call(this._context, value);
            } catch (err) {
                if (config.useDeprecatedSynchronousErrorHandling) {
                    parent.syncErrorValue = err;
                    parent.syncErrorThrown = !0;
                    return !0;
                }
                hostReportError(err);
                return !0;
            }
            return !1;
        };
        SafeSubscriber.prototype._unsubscribe = function() {
            var _parentSubscriber = this._parentSubscriber;
            this._context = null;
            this._parentSubscriber = null;
            _parentSubscriber.unsubscribe();
        };
        return SafeSubscriber;
    }(Subscriber);
    function canReportError(observer) {
        for (;observer; ) {
            var destination = observer.destination;
            if (observer.closed || observer.isStopped) return !1;
            observer = destination && destination instanceof Subscriber ? destination : null;
        }
        return !0;
    }
    function toSubscriber(nextOrObserver, error, complete) {
        if (nextOrObserver) {
            if (nextOrObserver instanceof Subscriber) return nextOrObserver;
            if (nextOrObserver[rxSubscriber]) return nextOrObserver[rxSubscriber]();
        }
        return nextOrObserver || error || complete ? new Subscriber(nextOrObserver, error, complete) : new Subscriber(empty);
    }
    var observable = "function" == typeof Symbol && Symbol.observable || "@@observable";
    function noop() {}
    function pipeFromArray(fns) {
        return fns ? 1 === fns.length ? fns[0] : function(input) {
            return fns.reduce(function(prev, fn) {
                return fn(prev);
            }, input);
        } : noop;
    }
    var Observable = function() {
        function Observable(subscribe) {
            this._isScalar = !1;
            subscribe && (this._subscribe = subscribe);
        }
        Observable.prototype.lift = function(operator) {
            var observable = new Observable();
            observable.source = this;
            observable.operator = operator;
            return observable;
        };
        Observable.prototype.subscribe = function(observerOrNext, error, complete) {
            var operator = this.operator, sink = toSubscriber(observerOrNext, error, complete);
            sink.add(operator ? operator.call(sink, this.source) : this.source || config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));
            if (config.useDeprecatedSynchronousErrorHandling && sink.syncErrorThrowable) {
                sink.syncErrorThrowable = !1;
                if (sink.syncErrorThrown) throw sink.syncErrorValue;
            }
            return sink;
        };
        Observable.prototype._trySubscribe = function(sink) {
            try {
                return this._subscribe(sink);
            } catch (err) {
                if (config.useDeprecatedSynchronousErrorHandling) {
                    sink.syncErrorThrown = !0;
                    sink.syncErrorValue = err;
                }
                canReportError(sink) ? sink.error(err) : console.warn(err);
            }
        };
        Observable.prototype.forEach = function(next, promiseCtor) {
            var _this = this;
            return new (promiseCtor = getPromiseCtor(promiseCtor))(function(resolve, reject) {
                var subscription;
                subscription = _this.subscribe(function(value) {
                    try {
                        next(value);
                    } catch (err) {
                        reject(err);
                        subscription && subscription.unsubscribe();
                    }
                }, reject, resolve);
            });
        };
        Observable.prototype._subscribe = function(subscriber) {
            var source = this.source;
            return source && source.subscribe(subscriber);
        };
        Observable.prototype[observable] = function() {
            return this;
        };
        Observable.prototype.pipe = function() {
            for (var operations = [], _i = 0; _i < arguments.length; _i++) operations[_i] = arguments[_i];
            return 0 === operations.length ? this : pipeFromArray(operations)(this);
        };
        Observable.prototype.toPromise = function(promiseCtor) {
            var _this = this;
            return new (promiseCtor = getPromiseCtor(promiseCtor))(function(resolve, reject) {
                var value;
                _this.subscribe(function(x) {
                    return value = x;
                }, function(err) {
                    return reject(err);
                }, function() {
                    return resolve(value);
                });
            });
        };
        return Observable;
    }();
    Observable.create = function(subscribe) {
        return new Observable(subscribe);
    };
    function getPromiseCtor(promiseCtor) {
        promiseCtor || (promiseCtor = config.Promise || Promise);
        if (!promiseCtor) throw new Error("no Promise impl found");
        return promiseCtor;
    }
    function ObjectUnsubscribedErrorImpl() {
        Error.call(this);
        this.message = "object unsubscribed";
        this.name = "ObjectUnsubscribedError";
        return this;
    }
    ObjectUnsubscribedErrorImpl.prototype = Object.create(Error.prototype);
    var ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl, SubjectSubscription = function(_super) {
        __extends(SubjectSubscription, _super);
        function SubjectSubscription(subject, subscriber) {
            var _this = _super.call(this) || this;
            _this.subject = subject;
            _this.subscriber = subscriber;
            _this.closed = !1;
            return _this;
        }
        SubjectSubscription.prototype.unsubscribe = function() {
            if (!this.closed) {
                this.closed = !0;
                var subject = this.subject, observers = subject.observers;
                this.subject = null;
                if (observers && 0 !== observers.length && !subject.isStopped && !subject.closed) {
                    var subscriberIndex = observers.indexOf(this.subscriber);
                    -1 !== subscriberIndex && observers.splice(subscriberIndex, 1);
                }
            }
        };
        return SubjectSubscription;
    }(Subscription), SubjectSubscriber = function(_super) {
        __extends(SubjectSubscriber, _super);
        function SubjectSubscriber(destination) {
            var _this = _super.call(this, destination) || this;
            _this.destination = destination;
            return _this;
        }
        return SubjectSubscriber;
    }(Subscriber), Subject = function(_super) {
        __extends(Subject, _super);
        function Subject() {
            var _this = _super.call(this) || this;
            _this.observers = [];
            _this.closed = !1;
            _this.isStopped = !1;
            _this.hasError = !1;
            _this.thrownError = null;
            return _this;
        }
        Subject.prototype[rxSubscriber] = function() {
            return new SubjectSubscriber(this);
        };
        Subject.prototype.lift = function(operator) {
            var subject = new AnonymousSubject(this, this);
            subject.operator = operator;
            return subject;
        };
        Subject.prototype.next = function(value) {
            if (this.closed) throw new ObjectUnsubscribedError();
            if (!this.isStopped) for (var observers = this.observers, len = observers.length, copy = observers.slice(), i = 0; i < len; i++) copy[i].next(value);
        };
        Subject.prototype.error = function(err) {
            if (this.closed) throw new ObjectUnsubscribedError();
            this.hasError = !0;
            this.thrownError = err;
            this.isStopped = !0;
            for (var observers = this.observers, len = observers.length, copy = observers.slice(), i = 0; i < len; i++) copy[i].error(err);
            this.observers.length = 0;
        };
        Subject.prototype.complete = function() {
            if (this.closed) throw new ObjectUnsubscribedError();
            this.isStopped = !0;
            for (var observers = this.observers, len = observers.length, copy = observers.slice(), i = 0; i < len; i++) copy[i].complete();
            this.observers.length = 0;
        };
        Subject.prototype.unsubscribe = function() {
            this.isStopped = !0;
            this.closed = !0;
            this.observers = null;
        };
        Subject.prototype._trySubscribe = function(subscriber) {
            if (this.closed) throw new ObjectUnsubscribedError();
            return _super.prototype._trySubscribe.call(this, subscriber);
        };
        Subject.prototype._subscribe = function(subscriber) {
            if (this.closed) throw new ObjectUnsubscribedError();
            if (this.hasError) {
                subscriber.error(this.thrownError);
                return Subscription.EMPTY;
            }
            if (this.isStopped) {
                subscriber.complete();
                return Subscription.EMPTY;
            }
            this.observers.push(subscriber);
            return new SubjectSubscription(this, subscriber);
        };
        Subject.prototype.asObservable = function() {
            var observable = new Observable();
            observable.source = this;
            return observable;
        };
        return Subject;
    }(Observable);
    Subject.create = function(destination, source) {
        return new AnonymousSubject(destination, source);
    };
    var AnonymousSubject = function(_super) {
        __extends(AnonymousSubject, _super);
        function AnonymousSubject(destination, source) {
            var _this = _super.call(this) || this;
            _this.destination = destination;
            _this.source = source;
            return _this;
        }
        AnonymousSubject.prototype.next = function(value) {
            var destination = this.destination;
            destination && destination.next && destination.next(value);
        };
        AnonymousSubject.prototype.error = function(err) {
            var destination = this.destination;
            destination && destination.error && this.destination.error(err);
        };
        AnonymousSubject.prototype.complete = function() {
            var destination = this.destination;
            destination && destination.complete && this.destination.complete();
        };
        AnonymousSubject.prototype._subscribe = function(subscriber) {
            return this.source ? this.source.subscribe(subscriber) : Subscription.EMPTY;
        };
        return AnonymousSubject;
    }(Subject);
    function refCount() {
        return function(source) {
            return source.lift(new RefCountOperator(source));
        };
    }
    var RefCountOperator = function() {
        function RefCountOperator(connectable) {
            this.connectable = connectable;
        }
        RefCountOperator.prototype.call = function(subscriber, source) {
            var connectable = this.connectable;
            connectable._refCount++;
            var refCounter = new RefCountSubscriber(subscriber, connectable), subscription = source.subscribe(refCounter);
            refCounter.closed || (refCounter.connection = connectable.connect());
            return subscription;
        };
        return RefCountOperator;
    }(), RefCountSubscriber = function(_super) {
        __extends(RefCountSubscriber, _super);
        function RefCountSubscriber(destination, connectable) {
            var _this = _super.call(this, destination) || this;
            _this.connectable = connectable;
            return _this;
        }
        RefCountSubscriber.prototype._unsubscribe = function() {
            var connectable = this.connectable;
            if (connectable) {
                this.connectable = null;
                var refCount = connectable._refCount;
                if (refCount <= 0) this.connection = null; else {
                    connectable._refCount = refCount - 1;
                    if (refCount > 1) this.connection = null; else {
                        var connection = this.connection, sharedConnection = connectable._connection;
                        this.connection = null;
                        !sharedConnection || connection && sharedConnection !== connection || sharedConnection.unsubscribe();
                    }
                }
            } else this.connection = null;
        };
        return RefCountSubscriber;
    }(Subscriber), connectableProto = function(_super) {
        __extends(ConnectableObservable, _super);
        function ConnectableObservable(source, subjectFactory) {
            var _this = _super.call(this) || this;
            _this.source = source;
            _this.subjectFactory = subjectFactory;
            _this._refCount = 0;
            _this._isComplete = !1;
            return _this;
        }
        ConnectableObservable.prototype._subscribe = function(subscriber) {
            return this.getSubject().subscribe(subscriber);
        };
        ConnectableObservable.prototype.getSubject = function() {
            var subject = this._subject;
            subject && !subject.isStopped || (this._subject = this.subjectFactory());
            return this._subject;
        };
        ConnectableObservable.prototype.connect = function() {
            var connection = this._connection;
            if (!connection) {
                this._isComplete = !1;
                (connection = this._connection = new Subscription()).add(this.source.subscribe(new ConnectableSubscriber(this.getSubject(), this)));
                if (connection.closed) {
                    this._connection = null;
                    connection = Subscription.EMPTY;
                } else this._connection = connection;
            }
            return connection;
        };
        ConnectableObservable.prototype.refCount = function() {
            return refCount()(this);
        };
        return ConnectableObservable;
    }(Observable).prototype, connectableObservableDescriptor = {
        operator: {
            value: null
        },
        _refCount: {
            value: 0,
            writable: !0
        },
        _subject: {
            value: null,
            writable: !0
        },
        _connection: {
            value: null,
            writable: !0
        },
        _subscribe: {
            value: connectableProto._subscribe
        },
        _isComplete: {
            value: connectableProto._isComplete,
            writable: !0
        },
        getSubject: {
            value: connectableProto.getSubject
        },
        connect: {
            value: connectableProto.connect
        },
        refCount: {
            value: connectableProto.refCount
        }
    }, ConnectableSubscriber = function(_super) {
        __extends(ConnectableSubscriber, _super);
        function ConnectableSubscriber(destination, connectable) {
            var _this = _super.call(this, destination) || this;
            _this.connectable = connectable;
            return _this;
        }
        ConnectableSubscriber.prototype._error = function(err) {
            this._unsubscribe();
            _super.prototype._error.call(this, err);
        };
        ConnectableSubscriber.prototype._complete = function() {
            this.connectable._isComplete = !0;
            this._unsubscribe();
            _super.prototype._complete.call(this);
        };
        ConnectableSubscriber.prototype._unsubscribe = function() {
            var connectable = this.connectable;
            if (connectable) {
                this.connectable = null;
                var connection = connectable._connection;
                connectable._refCount = 0;
                connectable._subject = null;
                connectable._connection = null;
                connection && connection.unsubscribe();
            }
        };
        return ConnectableSubscriber;
    }(SubjectSubscriber), AsyncAction = function(_super) {
        __extends(AsyncAction, _super);
        function AsyncAction(scheduler, work) {
            var _this = _super.call(this, scheduler, work) || this;
            _this.scheduler = scheduler;
            _this.work = work;
            _this.pending = !1;
            return _this;
        }
        AsyncAction.prototype.schedule = function(state, delay) {
            void 0 === delay && (delay = 0);
            if (this.closed) return this;
            this.state = state;
            var id = this.id, scheduler = this.scheduler;
            null != id && (this.id = this.recycleAsyncId(scheduler, id, delay));
            this.pending = !0;
            this.delay = delay;
            this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
            return this;
        };
        AsyncAction.prototype.requestAsyncId = function(scheduler, id, delay) {
            void 0 === delay && (delay = 0);
            return setInterval(scheduler.flush.bind(scheduler, this), delay);
        };
        AsyncAction.prototype.recycleAsyncId = function(scheduler, id, delay) {
            void 0 === delay && (delay = 0);
            if (null !== delay && this.delay === delay && !1 === this.pending) return id;
            clearInterval(id);
        };
        AsyncAction.prototype.execute = function(state, delay) {
            if (this.closed) return new Error("executing a cancelled action");
            this.pending = !1;
            var error = this._execute(state, delay);
            if (error) return error;
            !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
        };
        AsyncAction.prototype._execute = function(state, delay) {
            var errored = !1, errorValue = void 0;
            try {
                this.work(state);
            } catch (e) {
                errored = !0;
                errorValue = !!e && e || new Error(e);
            }
            if (errored) {
                this.unsubscribe();
                return errorValue;
            }
        };
        AsyncAction.prototype._unsubscribe = function() {
            var id = this.id, scheduler = this.scheduler, actions = scheduler.actions, index = actions.indexOf(this);
            this.work = null;
            this.state = null;
            this.pending = !1;
            this.scheduler = null;
            -1 !== index && actions.splice(index, 1);
            null != id && (this.id = this.recycleAsyncId(scheduler, id, null));
            this.delay = null;
        };
        return AsyncAction;
    }(function(_super) {
        __extends(Action, _super);
        function Action(scheduler, work) {
            return _super.call(this) || this;
        }
        Action.prototype.schedule = function(state, delay) {
            void 0 === delay && (delay = 0);
            return this;
        };
        return Action;
    }(Subscription)), QueueAction = function(_super) {
        __extends(QueueAction, _super);
        function QueueAction(scheduler, work) {
            var _this = _super.call(this, scheduler, work) || this;
            _this.scheduler = scheduler;
            _this.work = work;
            return _this;
        }
        QueueAction.prototype.schedule = function(state, delay) {
            void 0 === delay && (delay = 0);
            if (delay > 0) return _super.prototype.schedule.call(this, state, delay);
            this.delay = delay;
            this.state = state;
            this.scheduler.flush(this);
            return this;
        };
        QueueAction.prototype.execute = function(state, delay) {
            return delay > 0 || this.closed ? _super.prototype.execute.call(this, state, delay) : this._execute(state, delay);
        };
        QueueAction.prototype.requestAsyncId = function(scheduler, id, delay) {
            void 0 === delay && (delay = 0);
            return null !== delay && delay > 0 || null === delay && this.delay > 0 ? _super.prototype.requestAsyncId.call(this, scheduler, id, delay) : scheduler.flush(this);
        };
        return QueueAction;
    }(AsyncAction), Scheduler = function() {
        function Scheduler(SchedulerAction, now) {
            void 0 === now && (now = Scheduler.now);
            this.SchedulerAction = SchedulerAction;
            this.now = now;
        }
        Scheduler.prototype.schedule = function(work, delay, state) {
            void 0 === delay && (delay = 0);
            return new this.SchedulerAction(this, work).schedule(state, delay);
        };
        return Scheduler;
    }();
    Scheduler.now = function() {
        return Date.now();
    };
    var AsyncScheduler = function(_super) {
        __extends(AsyncScheduler, _super);
        function AsyncScheduler(SchedulerAction, now) {
            void 0 === now && (now = Scheduler.now);
            var _this = _super.call(this, SchedulerAction, function() {
                return AsyncScheduler.delegate && AsyncScheduler.delegate !== _this ? AsyncScheduler.delegate.now() : now();
            }) || this;
            _this.actions = [];
            _this.active = !1;
            _this.scheduled = void 0;
            return _this;
        }
        AsyncScheduler.prototype.schedule = function(work, delay, state) {
            void 0 === delay && (delay = 0);
            return AsyncScheduler.delegate && AsyncScheduler.delegate !== this ? AsyncScheduler.delegate.schedule(work, delay, state) : _super.prototype.schedule.call(this, work, delay, state);
        };
        AsyncScheduler.prototype.flush = function(action) {
            var actions = this.actions;
            if (this.active) actions.push(action); else {
                var error;
                this.active = !0;
                do {
                    if (error = action.execute(action.state, action.delay)) break;
                } while (action = actions.shift());
                this.active = !1;
                if (error) {
                    for (;action = actions.shift(); ) action.unsubscribe();
                    throw error;
                }
            }
        };
        return AsyncScheduler;
    }(Scheduler);
    new (function(_super) {
        __extends(QueueScheduler, _super);
        function QueueScheduler() {
            return null !== _super && _super.apply(this, arguments) || this;
        }
        return QueueScheduler;
    }(AsyncScheduler))(QueueAction);
    function isScheduler(value) {
        return value && "function" == typeof value.schedule;
    }
    var NotificationKind, subscribeToArray = function(array) {
        return function(subscriber) {
            for (var i = 0, len = array.length; i < len && !subscriber.closed; i++) subscriber.next(array[i]);
            subscriber.closed || subscriber.complete();
        };
    };
    function fromArray(input, scheduler) {
        return new Observable(scheduler ? function(subscriber) {
            var sub = new Subscription(), i = 0;
            sub.add(scheduler.schedule(function() {
                if (i !== input.length) {
                    subscriber.next(input[i++]);
                    subscriber.closed || sub.add(this.schedule());
                } else subscriber.complete();
            }));
            return sub;
        } : subscribeToArray(input));
    }
    !function(NotificationKind) {
        NotificationKind.NEXT = "N";
        NotificationKind.ERROR = "E";
        NotificationKind.COMPLETE = "C";
    }(NotificationKind || (NotificationKind = {}));
    var nextHandle = 1, tasksByHandle = {};
    function runIfPresent(handle) {
        var cb = tasksByHandle[handle];
        cb && cb();
    }
    var Immediate = {
        setImmediate: function(cb) {
            var handle = nextHandle++;
            tasksByHandle[handle] = cb;
            Promise.resolve().then(function() {
                return runIfPresent(handle);
            });
            return handle;
        },
        clearImmediate: function(handle) {
            delete tasksByHandle[handle];
        }
    }, AsapAction = function(_super) {
        __extends(AsapAction, _super);
        function AsapAction(scheduler, work) {
            var _this = _super.call(this, scheduler, work) || this;
            _this.scheduler = scheduler;
            _this.work = work;
            return _this;
        }
        AsapAction.prototype.requestAsyncId = function(scheduler, id, delay) {
            void 0 === delay && (delay = 0);
            if (null !== delay && delay > 0) return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
            scheduler.actions.push(this);
            return scheduler.scheduled || (scheduler.scheduled = Immediate.setImmediate(scheduler.flush.bind(scheduler, null)));
        };
        AsapAction.prototype.recycleAsyncId = function(scheduler, id, delay) {
            void 0 === delay && (delay = 0);
            if (null !== delay && delay > 0 || null === delay && this.delay > 0) return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
            if (0 === scheduler.actions.length) {
                Immediate.clearImmediate(id);
                scheduler.scheduled = void 0;
            }
        };
        return AsapAction;
    }(AsyncAction), AnimationFrameAction = (new (function(_super) {
        __extends(AsapScheduler, _super);
        function AsapScheduler() {
            return null !== _super && _super.apply(this, arguments) || this;
        }
        AsapScheduler.prototype.flush = function(action) {
            this.active = !0;
            this.scheduled = void 0;
            var error, actions = this.actions, index = -1, count = actions.length;
            action = action || actions.shift();
            do {
                if (error = action.execute(action.state, action.delay)) break;
            } while (++index < count && (action = actions.shift()));
            this.active = !1;
            if (error) {
                for (;++index < count && (action = actions.shift()); ) action.unsubscribe();
                throw error;
            }
        };
        return AsapScheduler;
    }(AsyncScheduler))(AsapAction), new AsyncScheduler(AsyncAction), function(_super) {
        __extends(AnimationFrameAction, _super);
        function AnimationFrameAction(scheduler, work) {
            var _this = _super.call(this, scheduler, work) || this;
            _this.scheduler = scheduler;
            _this.work = work;
            return _this;
        }
        AnimationFrameAction.prototype.requestAsyncId = function(scheduler, id, delay) {
            void 0 === delay && (delay = 0);
            if (null !== delay && delay > 0) return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
            scheduler.actions.push(this);
            return scheduler.scheduled || (scheduler.scheduled = requestAnimationFrame(function() {
                return scheduler.flush(null);
            }));
        };
        AnimationFrameAction.prototype.recycleAsyncId = function(scheduler, id, delay) {
            void 0 === delay && (delay = 0);
            if (null !== delay && delay > 0 || null === delay && this.delay > 0) return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
            if (0 === scheduler.actions.length) {
                cancelAnimationFrame(id);
                scheduler.scheduled = void 0;
            }
        };
        return AnimationFrameAction;
    }(AsyncAction));
    new (function(_super) {
        __extends(AnimationFrameScheduler, _super);
        function AnimationFrameScheduler() {
            return null !== _super && _super.apply(this, arguments) || this;
        }
        AnimationFrameScheduler.prototype.flush = function(action) {
            this.active = !0;
            this.scheduled = void 0;
            var error, actions = this.actions, index = -1, count = actions.length;
            action = action || actions.shift();
            do {
                if (error = action.execute(action.state, action.delay)) break;
            } while (++index < count && (action = actions.shift()));
            this.active = !1;
            if (error) {
                for (;++index < count && (action = actions.shift()); ) action.unsubscribe();
                throw error;
            }
        };
        return AnimationFrameScheduler;
    }(AsyncScheduler))(AnimationFrameAction);
    function identity(x) {
        return x;
    }
    function map(project, thisArg) {
        return function(source) {
            if ("function" != typeof project) throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");
            return source.lift(new MapOperator(project, thisArg));
        };
    }
    var MapOperator = function() {
        function MapOperator(project, thisArg) {
            this.project = project;
            this.thisArg = thisArg;
        }
        MapOperator.prototype.call = function(subscriber, source) {
            return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
        };
        return MapOperator;
    }(), MapSubscriber = function(_super) {
        __extends(MapSubscriber, _super);
        function MapSubscriber(destination, project, thisArg) {
            var _this = _super.call(this, destination) || this;
            _this.project = project;
            _this.count = 0;
            _this.thisArg = thisArg || _this;
            return _this;
        }
        MapSubscriber.prototype._next = function(value) {
            var result;
            try {
                result = this.project.call(this.thisArg, value, this.count++);
            } catch (err) {
                this.destination.error(err);
                return;
            }
            this.destination.next(result);
        };
        return MapSubscriber;
    }(Subscriber), OuterSubscriber = function(_super) {
        __extends(OuterSubscriber, _super);
        function OuterSubscriber() {
            return null !== _super && _super.apply(this, arguments) || this;
        }
        OuterSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.destination.next(innerValue);
        };
        OuterSubscriber.prototype.notifyError = function(error, innerSub) {
            this.destination.error(error);
        };
        OuterSubscriber.prototype.notifyComplete = function(innerSub) {
            this.destination.complete();
        };
        return OuterSubscriber;
    }(Subscriber), InnerSubscriber = function(_super) {
        __extends(InnerSubscriber, _super);
        function InnerSubscriber(parent, outerValue, outerIndex) {
            var _this = _super.call(this) || this;
            _this.parent = parent;
            _this.outerValue = outerValue;
            _this.outerIndex = outerIndex;
            _this.index = 0;
            return _this;
        }
        InnerSubscriber.prototype._next = function(value) {
            this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
        };
        InnerSubscriber.prototype._error = function(error) {
            this.parent.notifyError(error, this);
            this.unsubscribe();
        };
        InnerSubscriber.prototype._complete = function() {
            this.parent.notifyComplete(this);
            this.unsubscribe();
        };
        return InnerSubscriber;
    }(Subscriber), subscribeToPromise = function(promise) {
        return function(subscriber) {
            promise.then(function(value) {
                if (!subscriber.closed) {
                    subscriber.next(value);
                    subscriber.complete();
                }
            }, function(err) {
                return subscriber.error(err);
            }).then(null, hostReportError);
            return subscriber;
        };
    };
    function getSymbolIterator$1() {
        return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator";
    }
    var iterator = getSymbolIterator$1(), subscribeToIterable = function(iterable) {
        return function(subscriber) {
            for (var iterator$1 = iterable[iterator](); ;) {
                var item = iterator$1.next();
                if (item.done) {
                    subscriber.complete();
                    break;
                }
                subscriber.next(item.value);
                if (subscriber.closed) break;
            }
            "function" == typeof iterator$1.return && subscriber.add(function() {
                iterator$1.return && iterator$1.return();
            });
            return subscriber;
        };
    }, subscribeToObservable = function(obj) {
        return function(subscriber) {
            var obs = obj[observable]();
            if ("function" != typeof obs.subscribe) throw new TypeError("Provided object does not correctly implement Symbol.observable");
            return obs.subscribe(subscriber);
        };
    }, isArrayLike = function(x) {
        return x && "number" == typeof x.length && "function" != typeof x;
    };
    function isPromise$1(value) {
        return !!value && "function" != typeof value.subscribe && "function" == typeof value.then;
    }
    var subscribeTo = function(result) {
        if (result instanceof Observable) return function(subscriber) {
            if (!result._isScalar) return result.subscribe(subscriber);
            subscriber.next(result.value);
            subscriber.complete();
        };
        if (result && "function" == typeof result[observable]) return subscribeToObservable(result);
        if (isArrayLike(result)) return subscribeToArray(result);
        if (isPromise$1(result)) return subscribeToPromise(result);
        if (result && "function" == typeof result[iterator]) return subscribeToIterable(result);
        var value = isObject(result) ? "an invalid object" : "'" + result + "'";
        throw new TypeError("You provided " + value + " where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.");
    };
    function subscribeToResult(outerSubscriber, result, outerValue, outerIndex, destination) {
        void 0 === destination && (destination = new InnerSubscriber(outerSubscriber, outerValue, outerIndex));
        if (!destination.closed) return subscribeTo(result)(destination);
    }
    function isInteropObservable(input) {
        return input && "function" == typeof input[observable];
    }
    function isIterable(input) {
        return input && "function" == typeof input[iterator];
    }
    function fromPromise(input, scheduler) {
        return new Observable(scheduler ? function(subscriber) {
            var sub = new Subscription();
            sub.add(scheduler.schedule(function() {
                return input.then(function(value) {
                    sub.add(scheduler.schedule(function() {
                        subscriber.next(value);
                        sub.add(scheduler.schedule(function() {
                            return subscriber.complete();
                        }));
                    }));
                }, function(err) {
                    sub.add(scheduler.schedule(function() {
                        return subscriber.error(err);
                    }));
                });
            }));
            return sub;
        } : subscribeToPromise(input));
    }
    function fromIterable(input, scheduler) {
        if (!input) throw new Error("Iterable cannot be null");
        return new Observable(scheduler ? function(subscriber) {
            var iterator$1, sub = new Subscription();
            sub.add(function() {
                iterator$1 && "function" == typeof iterator$1.return && iterator$1.return();
            });
            sub.add(scheduler.schedule(function() {
                iterator$1 = input[iterator]();
                sub.add(scheduler.schedule(function() {
                    if (!subscriber.closed) {
                        var value, done;
                        try {
                            var result = iterator$1.next();
                            value = result.value;
                            done = result.done;
                        } catch (err) {
                            subscriber.error(err);
                            return;
                        }
                        if (done) subscriber.complete(); else {
                            subscriber.next(value);
                            this.schedule();
                        }
                    }
                }));
            }));
            return sub;
        } : subscribeToIterable(input));
    }
    function fromObservable(input, scheduler) {
        return new Observable(scheduler ? function(subscriber) {
            var sub = new Subscription();
            sub.add(scheduler.schedule(function() {
                var observable$1 = input[observable]();
                sub.add(observable$1.subscribe({
                    next: function(value) {
                        sub.add(scheduler.schedule(function() {
                            return subscriber.next(value);
                        }));
                    },
                    error: function(err) {
                        sub.add(scheduler.schedule(function() {
                            return subscriber.error(err);
                        }));
                    },
                    complete: function() {
                        sub.add(scheduler.schedule(function() {
                            return subscriber.complete();
                        }));
                    }
                }));
            }));
            return sub;
        } : subscribeToObservable(input));
    }
    function from(input, scheduler) {
        if (!scheduler) return input instanceof Observable ? input : new Observable(subscribeTo(input));
        if (null != input) {
            if (isInteropObservable(input)) return fromObservable(input, scheduler);
            if (isPromise$1(input)) return fromPromise(input, scheduler);
            if (isArrayLike(input)) return fromArray(input, scheduler);
            if (isIterable(input) || "string" == typeof input) return fromIterable(input, scheduler);
        }
        throw new TypeError((null !== input && typeof input || input) + " is not observable");
    }
    function mergeMap(project, resultSelector, concurrent) {
        void 0 === concurrent && (concurrent = Number.POSITIVE_INFINITY);
        if ("function" == typeof resultSelector) return function(source) {
            return source.pipe(mergeMap(function(a, i) {
                return from(project(a, i)).pipe(map(function(b, ii) {
                    return resultSelector(a, b, i, ii);
                }));
            }, concurrent));
        };
        "number" == typeof resultSelector && (concurrent = resultSelector);
        return function(source) {
            return source.lift(new MergeMapOperator(project, concurrent));
        };
    }
    var MergeMapOperator = function() {
        function MergeMapOperator(project, concurrent) {
            void 0 === concurrent && (concurrent = Number.POSITIVE_INFINITY);
            this.project = project;
            this.concurrent = concurrent;
        }
        MergeMapOperator.prototype.call = function(observer, source) {
            return source.subscribe(new MergeMapSubscriber(observer, this.project, this.concurrent));
        };
        return MergeMapOperator;
    }(), MergeMapSubscriber = function(_super) {
        __extends(MergeMapSubscriber, _super);
        function MergeMapSubscriber(destination, project, concurrent) {
            void 0 === concurrent && (concurrent = Number.POSITIVE_INFINITY);
            var _this = _super.call(this, destination) || this;
            _this.project = project;
            _this.concurrent = concurrent;
            _this.hasCompleted = !1;
            _this.buffer = [];
            _this.active = 0;
            _this.index = 0;
            return _this;
        }
        MergeMapSubscriber.prototype._next = function(value) {
            this.active < this.concurrent ? this._tryNext(value) : this.buffer.push(value);
        };
        MergeMapSubscriber.prototype._tryNext = function(value) {
            var result, index = this.index++;
            try {
                result = this.project(value, index);
            } catch (err) {
                this.destination.error(err);
                return;
            }
            this.active++;
            this._innerSub(result, value, index);
        };
        MergeMapSubscriber.prototype._innerSub = function(ish, value, index) {
            var innerSubscriber = new InnerSubscriber(this, void 0, void 0);
            this.destination.add(innerSubscriber);
            subscribeToResult(this, ish, value, index, innerSubscriber);
        };
        MergeMapSubscriber.prototype._complete = function() {
            this.hasCompleted = !0;
            0 === this.active && 0 === this.buffer.length && this.destination.complete();
            this.unsubscribe();
        };
        MergeMapSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
            this.destination.next(innerValue);
        };
        MergeMapSubscriber.prototype.notifyComplete = function(innerSub) {
            var buffer = this.buffer;
            this.remove(innerSub);
            this.active--;
            buffer.length > 0 ? this._next(buffer.shift()) : 0 === this.active && this.hasCompleted && this.destination.complete();
        };
        return MergeMapSubscriber;
    }(OuterSubscriber);
    function mergeAll(concurrent) {
        void 0 === concurrent && (concurrent = Number.POSITIVE_INFINITY);
        return mergeMap(identity, concurrent);
    }
    function merge$1() {
        for (var observables = [], _i = 0; _i < arguments.length; _i++) observables[_i] = arguments[_i];
        var concurrent = Number.POSITIVE_INFINITY, scheduler = null, last = observables[observables.length - 1];
        if (isScheduler(last)) {
            scheduler = observables.pop();
            observables.length > 1 && "number" == typeof observables[observables.length - 1] && (concurrent = observables.pop());
        } else "number" == typeof last && (concurrent = observables.pop());
        return null === scheduler && 1 === observables.length && observables[0] instanceof Observable ? observables[0] : mergeAll(concurrent)(fromArray(observables, scheduler));
    }
    var EventEmitter = function(_super) {
        __extends(EventEmitter, _super);
        function EventEmitter(isAsync) {
            void 0 === isAsync && (isAsync = !1);
            var _this = _super.call(this) || this;
            _this.__isAsync = isAsync;
            return _this;
        }
        EventEmitter.prototype.emit = function(value) {
            _super.prototype.next.call(this, value);
        };
        EventEmitter.prototype.subscribe = function(generatorOrNext, error, complete) {
            var schedulerFn, errorFn = function(err) {
                return null;
            }, completeFn = function() {
                return null;
            };
            if (generatorOrNext && "object" == typeof generatorOrNext) {
                schedulerFn = this.__isAsync ? function(value) {
                    setTimeout(function() {
                        return generatorOrNext.next(value);
                    });
                } : function(value) {
                    generatorOrNext.next(value);
                };
                generatorOrNext.error && (errorFn = this.__isAsync ? function(err) {
                    setTimeout(function() {
                        return generatorOrNext.error(err);
                    });
                } : function(err) {
                    generatorOrNext.error(err);
                });
                generatorOrNext.complete && (completeFn = this.__isAsync ? function() {
                    setTimeout(function() {
                        return generatorOrNext.complete();
                    });
                } : function() {
                    generatorOrNext.complete();
                });
            } else {
                schedulerFn = this.__isAsync ? function(value) {
                    setTimeout(function() {
                        return generatorOrNext(value);
                    });
                } : function(value) {
                    generatorOrNext(value);
                };
                error && (errorFn = this.__isAsync ? function(err) {
                    setTimeout(function() {
                        return error(err);
                    });
                } : function(err) {
                    error(err);
                });
                complete && (completeFn = this.__isAsync ? function() {
                    setTimeout(function() {
                        return complete();
                    });
                } : function() {
                    complete();
                });
            }
            var sink = _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
            generatorOrNext instanceof Subscription && generatorOrNext.add(sink);
            return sink;
        };
        return EventEmitter;
    }(Subject);
    function symbolIterator() {
        return this._results[getSymbolIterator()]();
    }
    var QueryList = function() {
        function QueryList() {
            this.dirty = !0;
            this._results = [];
            this.changes = new EventEmitter();
            this.length = 0;
            var symbol = getSymbolIterator(), proto = QueryList.prototype;
            proto[symbol] || (proto[symbol] = symbolIterator);
        }
        QueryList.prototype.map = function(fn) {
            return this._results.map(fn);
        };
        QueryList.prototype.filter = function(fn) {
            return this._results.filter(fn);
        };
        QueryList.prototype.find = function(fn) {
            return this._results.find(fn);
        };
        QueryList.prototype.reduce = function(fn, init) {
            return this._results.reduce(fn, init);
        };
        QueryList.prototype.forEach = function(fn) {
            this._results.forEach(fn);
        };
        QueryList.prototype.some = function(fn) {
            return this._results.some(fn);
        };
        QueryList.prototype.toArray = function() {
            return this._results.slice();
        };
        QueryList.prototype.toString = function() {
            return this._results.toString();
        };
        QueryList.prototype.reset = function(resultsTree) {
            this._results = flatten(resultsTree);
            this.dirty = !1;
            this.length = this._results.length;
            this.last = this._results[this.length - 1];
            this.first = this._results[0];
        };
        QueryList.prototype.notifyOnChanges = function() {
            this.changes.emit(this);
        };
        QueryList.prototype.setDirty = function() {
            this.dirty = !0;
        };
        QueryList.prototype.destroy = function() {
            this.changes.complete();
            this.changes.unsubscribe();
        };
        return QueryList;
    }(), LQuery = function() {
        function LQuery(next, list, predicate, values, containerValues) {
            this.next = next;
            this.list = list;
            this.predicate = predicate;
            this.values = values;
            this.containerValues = containerValues;
        }
        return LQuery;
    }(), LQueries_ = function() {
        function LQueries_(parent, shallow, deep, nodeIndex) {
            void 0 === nodeIndex && (nodeIndex = -1);
            this.parent = parent;
            this.shallow = shallow;
            this.deep = deep;
            this.nodeIndex = nodeIndex;
        }
        LQueries_.prototype.track = function(queryList, predicate, descend, read) {
            descend ? this.deep = createLQuery(this.deep, queryList, predicate, null != read ? read : null) : this.shallow = createLQuery(this.shallow, queryList, predicate, null != read ? read : null);
        };
        LQueries_.prototype.clone = function(tNode) {
            return null !== this.shallow || isContentQueryHost(tNode) ? new LQueries_(this, null, this.deep, tNode.index) : this;
        };
        LQueries_.prototype.container = function() {
            var shallowResults = copyQueriesToContainer(this.shallow), deepResults = copyQueriesToContainer(this.deep);
            return shallowResults || deepResults ? new LQueries_(this, shallowResults, deepResults) : null;
        };
        LQueries_.prototype.createView = function() {
            var shallowResults = copyQueriesToView(this.shallow), deepResults = copyQueriesToView(this.deep);
            return shallowResults || deepResults ? new LQueries_(this, shallowResults, deepResults) : null;
        };
        LQueries_.prototype.insertView = function(index) {
            insertView$1(index, this.shallow);
            insertView$1(index, this.deep);
        };
        LQueries_.prototype.addNode = function(tNode) {
            add(this.deep, tNode, !1);
            add(this.shallow, tNode, !1);
        };
        LQueries_.prototype.insertNodeBeforeViews = function(tNode) {
            add(this.deep, tNode, !0);
            add(this.shallow, tNode, !0);
        };
        LQueries_.prototype.removeView = function() {
            removeView$1(this.shallow);
            removeView$1(this.deep);
        };
        return LQueries_;
    }();
    function copyQueriesToContainer(query) {
        for (var result = null; query; ) {
            var containerValues = [];
            query.values.push(containerValues);
            result = new LQuery(result, query.list, query.predicate, containerValues, null);
            query = query.next;
        }
        return result;
    }
    function copyQueriesToView(query) {
        for (var result = null; query; ) {
            result = new LQuery(result, query.list, query.predicate, [], query.values);
            query = query.next;
        }
        return result;
    }
    function insertView$1(index, query) {
        for (;query; ) {
            query.containerValues.splice(index, 0, query.values);
            query.values.length && query.list.setDirty();
            query = query.next;
        }
    }
    function removeView$1(query) {
        for (;query; ) {
            var containerValues = query.containerValues, viewValuesIdx = containerValues.indexOf(query.values);
            containerValues.splice(viewValuesIdx, 1)[0].length && query.list.setDirty();
            query = query.next;
        }
    }
    function getIdxOfMatchingSelector(tNode, selector) {
        var localNames = tNode.localNames;
        if (localNames) for (var i = 0; i < localNames.length; i += 2) if (localNames[i] === selector) return localNames[i + 1];
        return null;
    }
    function queryByReadToken(read, tNode, currentView) {
        var factoryFn = read[NG_ELEMENT_ID];
        if ("function" == typeof factoryFn) return factoryFn();
        var matchingIdx = locateDirectiveOrProvider(tNode, currentView, read, !1, !1);
        return null !== matchingIdx ? getNodeInjectable(currentView[TVIEW].data, currentView, matchingIdx, tNode) : null;
    }
    function queryByTNodeType(tNode, currentView) {
        return 3 === tNode.type || 4 === tNode.type ? createElementRef(ElementRef, tNode, currentView) : 0 === tNode.type ? createTemplateRef(TemplateRef, ElementRef, tNode, currentView) : null;
    }
    function queryByTemplateRef(templateRefToken, tNode, currentView, read) {
        var templateRefResult = templateRefToken[NG_ELEMENT_ID]();
        return read ? templateRefResult ? queryByReadToken(read, tNode, currentView) : null : templateRefResult;
    }
    function queryRead(tNode, currentView, read, matchingIdx) {
        return read ? queryByReadToken(read, tNode, currentView) : matchingIdx > -1 ? getNodeInjectable(currentView[TVIEW].data, currentView, matchingIdx, tNode) : queryByTNodeType(tNode, currentView);
    }
    function add(query, tNode, insertBeforeContainer) {
        for (var currentView = getLView(); query; ) {
            var predicate = query.predicate, type = predicate.type;
            if (type) {
                var result = null;
                type === TemplateRef ? result = queryByTemplateRef(type, tNode, currentView, predicate.read) : null !== (matchingIdx = locateDirectiveOrProvider(tNode, currentView, type, !1, !1)) && (result = queryRead(tNode, currentView, predicate.read, matchingIdx));
                null !== result && addMatch(query, result, insertBeforeContainer);
            } else for (var selector = predicate.selector, i = 0; i < selector.length; i++) {
                var matchingIdx;
                null !== (matchingIdx = getIdxOfMatchingSelector(tNode, selector[i])) && null !== (result = queryRead(tNode, currentView, predicate.read, matchingIdx)) && addMatch(query, result, insertBeforeContainer);
            }
            query = query.next;
        }
    }
    function addMatch(query, matchingValue, insertBeforeViewMatches) {
        insertBeforeViewMatches ? query.values.unshift(matchingValue) : query.values.push(matchingValue);
        query.list.setDirty();
    }
    function createPredicate(predicate, read) {
        var isArray = Array.isArray(predicate);
        return {
            type: isArray ? null : predicate,
            selector: isArray ? predicate : null,
            read: read
        };
    }
    function createLQuery(previous, queryList, predicate, read) {
        return new LQuery(previous, queryList, createPredicate(predicate, read), queryList._valuesTree, null);
    }
    function createQueryListInLView(lView, predicate, descend, read, isStatic, nodeIndex) {
        var queryList = new QueryList(), queries = lView[QUERIES] || (lView[QUERIES] = new LQueries_(null, null, null, nodeIndex));
        queryList._valuesTree = [];
        queryList._static = isStatic;
        queries.track(queryList, predicate, descend, read);
        storeCleanupWithContext(lView, queryList, queryList.destroy);
        return queryList;
    }
    function ɵɵqueryRefresh(queryList) {
        var queryListImpl = queryList, creationMode = isCreationMode();
        if (queryList.dirty && creationMode === queryListImpl._static) {
            queryList.reset(queryListImpl._valuesTree || []);
            queryList.notifyOnChanges();
            return !0;
        }
        return !1;
    }
    function ɵɵstaticViewQuery(predicate, descend, read) {
        var lView = getLView(), tView = lView[TVIEW];
        viewQueryInternal(lView, tView, predicate, descend, read, !0);
        tView.staticViewQueries = !0;
    }
    function ɵɵviewQuery(predicate, descend, read) {
        var lView = getLView();
        return viewQueryInternal(lView, lView[TVIEW], predicate, descend, read, !1);
    }
    function viewQueryInternal(lView, tView, predicate, descend, read, isStatic) {
        tView.firstTemplatePass && tView.expandoStartIndex++;
        var index = getCurrentQueryIndex(), queryList = createQueryListInLView(lView, predicate, descend, read, isStatic, -1);
        store(index - HEADER_OFFSET, queryList);
        setCurrentQueryIndex(index + 1);
        return queryList;
    }
    function ɵɵloadViewQuery() {
        var index = getCurrentQueryIndex();
        setCurrentQueryIndex(index + 1);
        return loadInternal(getLView(), index - HEADER_OFFSET);
    }
    function ɵɵcontentQuery(directiveIndex, predicate, descend, read) {
        var lView = getLView();
        return contentQueryInternal(lView, lView[TVIEW], directiveIndex, predicate, descend, read, !1, getPreviousOrParentTNode().index);
    }
    function contentQueryInternal(lView, tView, directiveIndex, predicate, descend, read, isStatic, nodeIndex) {
        var contentQuery = createQueryListInLView(lView, predicate, descend, read, isStatic, nodeIndex);
        (lView[CONTENT_QUERIES] || (lView[CONTENT_QUERIES] = [])).push(contentQuery);
        if (tView.firstTemplatePass) {
            var tViewContentQueries = tView.contentQueries || (tView.contentQueries = []);
            directiveIndex !== (tView.contentQueries.length ? tView.contentQueries[tView.contentQueries.length - 1] : -1) && tViewContentQueries.push(directiveIndex);
        }
        return contentQuery;
    }
    function ɵɵstaticContentQuery(directiveIndex, predicate, descend, read) {
        var lView = getLView(), tView = lView[TVIEW];
        contentQueryInternal(lView, tView, directiveIndex, predicate, descend, read, !0, getPreviousOrParentTNode().index);
        tView.staticContentQueries = !0;
    }
    function ɵɵloadContentQuery() {
        var lView = getLView(), index = getCurrentQueryIndex();
        setCurrentQueryIndex(index + 1);
        return lView[CONTENT_QUERIES][index];
    }
    function ɵɵtemplateRefExtractor(tNode, currentView) {
        return createTemplateRef(TemplateRef, ElementRef, tNode, currentView);
    }
    var angularCoreEnv = {
        "ɵɵattribute": ɵɵattribute,
        "ɵɵattributeInterpolate1": ɵɵattributeInterpolate1,
        "ɵɵattributeInterpolate2": ɵɵattributeInterpolate2,
        "ɵɵattributeInterpolate3": ɵɵattributeInterpolate3,
        "ɵɵattributeInterpolate4": ɵɵattributeInterpolate4,
        "ɵɵattributeInterpolate5": ɵɵattributeInterpolate5,
        "ɵɵattributeInterpolate6": ɵɵattributeInterpolate6,
        "ɵɵattributeInterpolate7": ɵɵattributeInterpolate7,
        "ɵɵattributeInterpolate8": ɵɵattributeInterpolate8,
        "ɵɵattributeInterpolateV": ɵɵattributeInterpolateV,
        "ɵɵdefineBase": ɵɵdefineBase,
        "ɵɵdefineComponent": ɵɵdefineComponent,
        "ɵɵdefineDirective": ɵɵdefineDirective,
        "ɵɵdefineInjectable": ɵɵdefineInjectable,
        "ɵɵdefineInjector": ɵɵdefineInjector,
        "ɵɵdefineNgModule": ɵɵdefineNgModule,
        "ɵɵdefinePipe": ɵɵdefinePipe,
        "ɵɵdirectiveInject": ɵɵdirectiveInject,
        "ɵɵgetFactoryOf": ɵɵgetFactoryOf,
        "ɵɵgetInheritedFactory": ɵɵgetInheritedFactory,
        "ɵɵinject": ɵɵinject,
        "ɵɵinjectAttribute": ɵɵinjectAttribute,
        "ɵɵtemplateRefExtractor": ɵɵtemplateRefExtractor,
        "ɵɵNgOnChangesFeature": ɵɵNgOnChangesFeature,
        "ɵɵProvidersFeature": ɵɵProvidersFeature,
        "ɵɵInheritDefinitionFeature": ɵɵInheritDefinitionFeature,
        "ɵɵelementAttribute": ɵɵelementAttribute,
        "ɵɵbind": ɵɵbind,
        "ɵɵcontainer": ɵɵcontainer,
        "ɵɵnextContext": ɵɵnextContext,
        "ɵɵcontainerRefreshStart": ɵɵcontainerRefreshStart,
        "ɵɵcontainerRefreshEnd": ɵɵcontainerRefreshEnd,
        "ɵɵnamespaceHTML": ɵɵnamespaceHTML,
        "ɵɵnamespaceMathML": ɵɵnamespaceMathML,
        "ɵɵnamespaceSVG": ɵɵnamespaceSVG,
        "ɵɵenableBindings": ɵɵenableBindings,
        "ɵɵdisableBindings": ɵɵdisableBindings,
        "ɵɵallocHostVars": ɵɵallocHostVars,
        "ɵɵelementStart": ɵɵelementStart,
        "ɵɵelementEnd": ɵɵelementEnd,
        "ɵɵelement": ɵɵelement,
        "ɵɵelementContainerStart": ɵɵelementContainerStart,
        "ɵɵelementContainerEnd": ɵɵelementContainerEnd,
        "ɵɵpureFunction0": ɵɵpureFunction0,
        "ɵɵpureFunction1": ɵɵpureFunction1,
        "ɵɵpureFunction2": ɵɵpureFunction2,
        "ɵɵpureFunction3": ɵɵpureFunction3,
        "ɵɵpureFunction4": ɵɵpureFunction4,
        "ɵɵpureFunction5": ɵɵpureFunction5,
        "ɵɵpureFunction6": ɵɵpureFunction6,
        "ɵɵpureFunction7": ɵɵpureFunction7,
        "ɵɵpureFunction8": ɵɵpureFunction8,
        "ɵɵpureFunctionV": ɵɵpureFunctionV,
        "ɵɵgetCurrentView": ɵɵgetCurrentView,
        "ɵɵrestoreView": ɵɵrestoreView,
        "ɵɵinterpolation1": ɵɵinterpolation1,
        "ɵɵinterpolation2": ɵɵinterpolation2,
        "ɵɵinterpolation3": ɵɵinterpolation3,
        "ɵɵinterpolation4": ɵɵinterpolation4,
        "ɵɵinterpolation5": ɵɵinterpolation5,
        "ɵɵinterpolation6": ɵɵinterpolation6,
        "ɵɵinterpolation7": ɵɵinterpolation7,
        "ɵɵinterpolation8": ɵɵinterpolation8,
        "ɵɵinterpolationV": ɵɵinterpolationV,
        "ɵɵlistener": ɵɵlistener,
        "ɵɵload": ɵɵload,
        "ɵɵprojection": ɵɵprojection,
        "ɵɵupdateSyntheticHostBinding": ɵɵupdateSyntheticHostBinding,
        "ɵɵcomponentHostSyntheticListener": ɵɵcomponentHostSyntheticListener,
        "ɵɵpipeBind1": ɵɵpipeBind1,
        "ɵɵpipeBind2": ɵɵpipeBind2,
        "ɵɵpipeBind3": ɵɵpipeBind3,
        "ɵɵpipeBind4": ɵɵpipeBind4,
        "ɵɵpipeBindV": ɵɵpipeBindV,
        "ɵɵprojectionDef": ɵɵprojectionDef,
        "ɵɵproperty": ɵɵproperty,
        "ɵɵpropertyInterpolate": ɵɵpropertyInterpolate,
        "ɵɵpropertyInterpolate1": ɵɵpropertyInterpolate1,
        "ɵɵpropertyInterpolate2": ɵɵpropertyInterpolate2,
        "ɵɵpropertyInterpolate3": ɵɵpropertyInterpolate3,
        "ɵɵpropertyInterpolate4": ɵɵpropertyInterpolate4,
        "ɵɵpropertyInterpolate5": ɵɵpropertyInterpolate5,
        "ɵɵpropertyInterpolate6": ɵɵpropertyInterpolate6,
        "ɵɵpropertyInterpolate7": ɵɵpropertyInterpolate7,
        "ɵɵpropertyInterpolate8": ɵɵpropertyInterpolate8,
        "ɵɵpropertyInterpolateV": ɵɵpropertyInterpolateV,
        "ɵɵpipe": ɵɵpipe,
        "ɵɵqueryRefresh": ɵɵqueryRefresh,
        "ɵɵviewQuery": ɵɵviewQuery,
        "ɵɵstaticViewQuery": ɵɵstaticViewQuery,
        "ɵɵstaticContentQuery": ɵɵstaticContentQuery,
        "ɵɵloadViewQuery": ɵɵloadViewQuery,
        "ɵɵcontentQuery": ɵɵcontentQuery,
        "ɵɵloadContentQuery": ɵɵloadContentQuery,
        "ɵɵreference": ɵɵreference,
        "ɵɵelementHostAttrs": ɵɵelementHostAttrs,
        "ɵɵclassMap": ɵɵclassMap,
        "ɵɵstyling": ɵɵstyling,
        "ɵɵstyleMap": ɵɵstyleMap,
        "ɵɵstyleProp": ɵɵstyleProp,
        "ɵɵstyleSanitizer": styleSanitizer,
        "ɵɵstylingApply": ɵɵstylingApply,
        "ɵɵclassProp": ɵɵclassProp,
        "ɵɵselect": ɵɵselect,
        "ɵɵtemplate": ɵɵtemplate,
        "ɵɵtext": ɵɵtext,
        "ɵɵtextBinding": ɵɵtextBinding,
        "ɵɵtextInterpolate": ɵɵtextInterpolate,
        "ɵɵtextInterpolate1": ɵɵtextInterpolate1,
        "ɵɵtextInterpolate2": ɵɵtextInterpolate2,
        "ɵɵtextInterpolate3": ɵɵtextInterpolate3,
        "ɵɵtextInterpolate4": ɵɵtextInterpolate4,
        "ɵɵtextInterpolate5": ɵɵtextInterpolate5,
        "ɵɵtextInterpolate6": ɵɵtextInterpolate6,
        "ɵɵtextInterpolate7": ɵɵtextInterpolate7,
        "ɵɵtextInterpolate8": ɵɵtextInterpolate8,
        "ɵɵtextInterpolateV": ɵɵtextInterpolateV,
        "ɵɵembeddedViewStart": ɵɵembeddedViewStart,
        "ɵɵembeddedViewEnd": ɵɵembeddedViewEnd,
        "ɵɵi18n": ɵɵi18n,
        "ɵɵi18nAttributes": ɵɵi18nAttributes,
        "ɵɵi18nExp": ɵɵi18nExp,
        "ɵɵi18nStart": ɵɵi18nStart,
        "ɵɵi18nEnd": ɵɵi18nEnd,
        "ɵɵi18nApply": ɵɵi18nApply,
        "ɵɵi18nPostprocess": ɵɵi18nPostprocess,
        "ɵɵi18nLocalize": ɵɵi18nLocalize,
        "ɵɵresolveWindow": ɵɵresolveWindow,
        "ɵɵresolveDocument": ɵɵresolveDocument,
        "ɵɵresolveBody": ɵɵresolveBody,
        "ɵɵsetComponentScope": ɵɵsetComponentScope,
        "ɵɵsetNgModuleScope": ɵɵsetNgModuleScope,
        "ɵɵsanitizeHtml": ɵɵsanitizeHtml,
        "ɵɵsanitizeStyle": ɵɵsanitizeStyle,
        "ɵɵdefaultStyleSanitizer": ɵɵdefaultStyleSanitizer,
        "ɵɵsanitizeResourceUrl": ɵɵsanitizeResourceUrl,
        "ɵɵsanitizeScript": ɵɵsanitizeScript,
        "ɵɵsanitizeUrl": ɵɵsanitizeUrl,
        "ɵɵsanitizeUrlOrResourceUrl": ɵɵsanitizeUrlOrResourceUrl
    }, EMPTY_ARRAY$2 = [], moduleQueue = [];
    function enqueueModuleForDelayedScoping(moduleType, ngModule) {
        moduleQueue.push({
            moduleType: moduleType,
            ngModule: ngModule
        });
    }
    var flushingModuleQueue = !1;
    function flushModuleScopingQueueAsMuchAsPossible() {
        if (!flushingModuleQueue) {
            flushingModuleQueue = !0;
            try {
                for (var i = moduleQueue.length - 1; i >= 0; i--) {
                    var _b = moduleQueue[i], moduleType = _b.moduleType, ngModule = _b.ngModule;
                    if (ngModule.declarations && ngModule.declarations.every(isResolvedDeclaration)) {
                        moduleQueue.splice(i, 1);
                        setScopeOnDeclaredComponents(moduleType, ngModule);
                    }
                }
            } finally {
                flushingModuleQueue = !1;
            }
        }
    }
    function isResolvedDeclaration(declaration) {
        return Array.isArray(declaration) ? declaration.every(isResolvedDeclaration) : !!resolveForwardRef(declaration);
    }
    function compileNgModule(moduleType, ngModule) {
        void 0 === ngModule && (ngModule = {});
        compileNgModuleDefs(moduleType, ngModule);
        enqueueModuleForDelayedScoping(moduleType, ngModule);
    }
    function compileNgModuleDefs(moduleType, ngModule, allowDuplicateDeclarationsInRoot) {
        void 0 === allowDuplicateDeclarationsInRoot && (allowDuplicateDeclarationsInRoot = !1);
        var declarations = flatten(ngModule.declarations || EMPTY_ARRAY$2), ngModuleDef = null;
        Object.defineProperty(moduleType, NG_MODULE_DEF, {
            configurable: !0,
            get: function() {
                null === ngModuleDef && (ngModuleDef = getCompilerFacade().compileNgModule(angularCoreEnv, "ng:///" + moduleType.name + "/ngModuleDef.js", {
                    type: moduleType,
                    bootstrap: flatten(ngModule.bootstrap || EMPTY_ARRAY$2).map(resolveForwardRef),
                    declarations: declarations.map(resolveForwardRef),
                    imports: flatten(ngModule.imports || EMPTY_ARRAY$2).map(resolveForwardRef).map(expandModuleWithProviders),
                    exports: flatten(ngModule.exports || EMPTY_ARRAY$2).map(resolveForwardRef).map(expandModuleWithProviders),
                    emitInline: !0,
                    schemas: ngModule.schemas ? flatten(ngModule.schemas) : null,
                    id: ngModule.id || null
                }));
                return ngModuleDef;
            }
        });
        var ngInjectorDef = null;
        Object.defineProperty(moduleType, NG_INJECTOR_DEF, {
            get: function() {
                if (null === ngInjectorDef) {
                    var meta = {
                        name: moduleType.name,
                        type: moduleType,
                        deps: reflectDependencies(moduleType),
                        providers: ngModule.providers || EMPTY_ARRAY$2,
                        imports: [ (ngModule.imports || EMPTY_ARRAY$2).map(resolveForwardRef), (ngModule.exports || EMPTY_ARRAY$2).map(resolveForwardRef) ]
                    };
                    ngInjectorDef = getCompilerFacade().compileInjector(angularCoreEnv, "ng:///" + moduleType.name + "/ngInjectorDef.js", meta);
                }
                return ngInjectorDef;
            },
            configurable: !1
        });
    }
    new Map(), new Map();
    function setScopeOnDeclaredComponents(moduleType, ngModule) {
        var declarations = flatten(ngModule.declarations || EMPTY_ARRAY$2), transitiveScopes = transitiveScopesFor(moduleType);
        declarations.forEach(function(declaration) {
            declaration.hasOwnProperty(NG_COMPONENT_DEF) ? patchComponentDefWithScope(getComponentDef(declaration), transitiveScopes) : declaration.hasOwnProperty(NG_DIRECTIVE_DEF) || declaration.hasOwnProperty(NG_PIPE_DEF) || (declaration.ngSelectorScope = moduleType);
        });
    }
    function patchComponentDefWithScope(componentDef, transitiveScopes) {
        componentDef.directiveDefs = function() {
            return Array.from(transitiveScopes.compilation.directives).map(function(dir) {
                return dir.hasOwnProperty(NG_COMPONENT_DEF) ? getComponentDef(dir) : getDirectiveDef(dir);
            }).filter(function(def) {
                return !!def;
            });
        };
        componentDef.pipeDefs = function() {
            return Array.from(transitiveScopes.compilation.pipes).map(function(pipe) {
                return getPipeDef(pipe);
            });
        };
        componentDef.schemas = transitiveScopes.schemas;
        componentDef.tView = null;
    }
    function transitiveScopesFor(moduleType, processNgModuleFn) {
        if (!isNgModule(moduleType)) throw new Error(moduleType.name + " does not have an ngModuleDef");
        var def = getNgModuleDef(moduleType);
        if (null !== def.transitiveCompileScopes) return def.transitiveCompileScopes;
        var scopes = {
            schemas: def.schemas || null,
            compilation: {
                directives: new Set(),
                pipes: new Set()
            },
            exported: {
                directives: new Set(),
                pipes: new Set()
            }
        };
        maybeUnwrapFn(def.declarations).forEach(function(declared) {
            getPipeDef(declared) ? scopes.compilation.pipes.add(declared) : scopes.compilation.directives.add(declared);
        });
        maybeUnwrapFn(def.imports).forEach(function(imported) {
            var importedType = imported;
            if (!isNgModule(importedType)) throw new Error("Importing " + importedType.name + " which does not have an ngModuleDef");
            processNgModuleFn && processNgModuleFn(importedType);
            var importedScope = transitiveScopesFor(importedType, processNgModuleFn);
            importedScope.exported.directives.forEach(function(entry) {
                return scopes.compilation.directives.add(entry);
            });
            importedScope.exported.pipes.forEach(function(entry) {
                return scopes.compilation.pipes.add(entry);
            });
        });
        maybeUnwrapFn(def.exports).forEach(function(exported) {
            var exportedType = exported;
            if (isNgModule(exportedType)) {
                var exportedScope = transitiveScopesFor(exportedType, processNgModuleFn);
                exportedScope.exported.directives.forEach(function(entry) {
                    scopes.compilation.directives.add(entry);
                    scopes.exported.directives.add(entry);
                });
                exportedScope.exported.pipes.forEach(function(entry) {
                    scopes.compilation.pipes.add(entry);
                    scopes.exported.pipes.add(entry);
                });
            } else getPipeDef(exportedType) ? scopes.exported.pipes.add(exportedType) : scopes.exported.directives.add(exportedType);
        });
        def.transitiveCompileScopes = scopes;
        return scopes;
    }
    function expandModuleWithProviders(value) {
        return isModuleWithProviders(value) ? value.ngModule : value;
    }
    function isModuleWithProviders(value) {
        return void 0 !== value.ngModule;
    }
    function isNgModule(value) {
        return !!getNgModuleDef(value);
    }
    function compileComponent(type, metadata) {
        var ngComponentDef = null;
        maybeQueueResolutionOfComponentResources(type, metadata);
        Object.defineProperty(type, NG_COMPONENT_DEF, {
            get: function() {
                var compiler = getCompilerFacade();
                if (null === ngComponentDef) {
                    if (componentNeedsResolution(metadata)) {
                        var error = [ "Component '" + type.name + "' is not resolved:" ];
                        metadata.templateUrl && error.push(" - templateUrl: " + metadata.templateUrl);
                        metadata.styleUrls && metadata.styleUrls.length && error.push(" - styleUrls: " + JSON.stringify(metadata.styleUrls));
                        error.push("Did you run and wait for 'resolveComponentResources()'?");
                        throw new Error(error.join("\n"));
                    }
                    var templateUrl = metadata.templateUrl || "ng:///" + type.name + "/template.html", meta = Object.assign({}, directiveMetadata(type, metadata), {
                        typeSourceSpan: compiler.createParseSourceSpan("Component", type.name, templateUrl),
                        template: metadata.template || "",
                        preserveWhitespaces: metadata.preserveWhitespaces || !1,
                        styles: metadata.styles || EMPTY_ARRAY$1,
                        animations: metadata.animations,
                        directives: [],
                        changeDetection: metadata.changeDetection,
                        pipes: new Map(),
                        encapsulation: metadata.encapsulation || ViewEncapsulation.Emulated,
                        interpolation: metadata.interpolation,
                        viewProviders: metadata.viewProviders || null
                    });
                    meta.usesInheritance && addBaseDefToUndecoratedParents(type);
                    ngComponentDef = compiler.compileComponent(angularCoreEnv, templateUrl, meta);
                    flushModuleScopingQueueAsMuchAsPossible();
                    if (hasSelectorScope(type)) {
                        var scopes = transitiveScopesFor(type.ngSelectorScope);
                        patchComponentDefWithScope(ngComponentDef, scopes);
                    }
                }
                return ngComponentDef;
            },
            configurable: !1
        });
        compileInjectable(type);
    }
    function hasSelectorScope(component) {
        return void 0 !== component.ngSelectorScope;
    }
    function compileDirective(type, directive) {
        var ngDirectiveDef = null;
        Object.defineProperty(type, NG_DIRECTIVE_DEF, {
            get: function() {
                if (null === ngDirectiveDef) {
                    var name_3 = type && type.name, sourceMapUrl = "ng:///" + name_3 + "/ngDirectiveDef.js", compiler = getCompilerFacade(), facade = directiveMetadata(type, directive);
                    facade.typeSourceSpan = compiler.createParseSourceSpan("Directive", name_3, sourceMapUrl);
                    facade.usesInheritance && addBaseDefToUndecoratedParents(type);
                    ngDirectiveDef = compiler.compileDirective(angularCoreEnv, sourceMapUrl, facade);
                }
                return ngDirectiveDef;
            },
            configurable: !1
        });
        compileInjectable(type);
    }
    function extendsDirectlyFromObject(type) {
        return Object.getPrototypeOf(type.prototype) === Object.prototype;
    }
    function directiveMetadata(type, metadata) {
        var propMetadata = getReflect().ownPropMetadata(type);
        return {
            name: type.name,
            type: type,
            typeArgumentCount: 0,
            selector: metadata.selector,
            deps: reflectDependencies(type),
            host: metadata.host || EMPTY_OBJ,
            propMetadata: propMetadata,
            inputs: metadata.inputs || EMPTY_ARRAY$1,
            outputs: metadata.outputs || EMPTY_ARRAY$1,
            queries: extractQueriesMetadata(type, propMetadata, isContentQuery),
            lifecycle: {
                usesOnChanges: type.prototype.hasOwnProperty("ngOnChanges")
            },
            typeSourceSpan: null,
            usesInheritance: !extendsDirectlyFromObject(type),
            exportAs: extractExportAs(metadata.exportAs),
            providers: metadata.providers || null,
            viewQueries: extractQueriesMetadata(type, propMetadata, isViewQuery)
        };
    }
    function addBaseDefToUndecoratedParents(type) {
        for (var objPrototype = Object.prototype, parent = Object.getPrototypeOf(type); parent && parent !== objPrototype; ) {
            if (!getDirectiveDef(parent) && !getComponentDef(parent) && !getBaseDef(parent)) {
                var facade = extractBaseDefMetadata(parent);
                facade && compileBase(parent, facade);
            }
            parent = Object.getPrototypeOf(parent);
        }
    }
    function compileBase(type, facade) {
        var ngBaseDef = null;
        Object.defineProperty(type, NG_BASE_DEF, {
            get: function() {
                if (null === ngBaseDef) {
                    var sourceMapUrl = "ng://" + (type && type.name) + "/ngBaseDef.js", compiler = getCompilerFacade();
                    ngBaseDef = compiler.compileBase(angularCoreEnv, sourceMapUrl, facade);
                }
                return ngBaseDef;
            },
            configurable: !1
        });
    }
    function extractBaseDefMetadata(type) {
        var inputs, outputs, propMetadata = getReflect().ownPropMetadata(type), viewQueries = extractQueriesMetadata(type, propMetadata, isViewQuery), queries = extractQueriesMetadata(type, propMetadata, isContentQuery), hasHostDecorators = !1, _loop_2 = function(field) {
            propMetadata[field].forEach(function(ann) {
                var metadataName = ann.ngMetadataName;
                "Input" === metadataName ? (inputs = inputs || {})[field] = ann.bindingPropertyName ? [ ann.bindingPropertyName, field ] : field : "Output" === metadataName ? (outputs = outputs || {})[field] = ann.bindingPropertyName || field : "HostBinding" !== metadataName && "HostListener" !== metadataName || (hasHostDecorators = !0);
            });
        };
        for (var field in propMetadata) _loop_2(field);
        return inputs || outputs || viewQueries.length || queries.length || hasHostDecorators ? {
            name: type.name,
            inputs: inputs,
            outputs: outputs,
            viewQueries: viewQueries,
            queries: queries,
            propMetadata: propMetadata
        } : null;
    }
    function convertToR3QueryPredicate(selector) {
        return "string" == typeof selector ? splitByComma(selector) : resolveForwardRef(selector);
    }
    function convertToR3QueryMetadata(propertyName, ann) {
        return {
            propertyName: propertyName,
            predicate: convertToR3QueryPredicate(ann.selector),
            descendants: ann.descendants,
            first: ann.first,
            read: ann.read ? ann.read : null,
            static: !!ann.static
        };
    }
    function extractQueriesMetadata(type, propMetadata, isQueryAnn) {
        var queriesMeta = [], _loop_3 = function(field) {
            if (propMetadata.hasOwnProperty(field)) {
                var annotations_1 = propMetadata[field];
                annotations_1.forEach(function(ann) {
                    if (isQueryAnn(ann)) {
                        if (!ann.selector) throw new Error("Can't construct a query for the property \"" + field + '" of "' + stringifyForError(type) + "\" since the query selector wasn't defined.");
                        if (annotations_1.some(isInputAnn)) throw new Error("Cannot combine @Input decorators with query decorators");
                        queriesMeta.push(convertToR3QueryMetadata(field, ann));
                    }
                });
            }
        };
        for (var field in propMetadata) _loop_3(field);
        return queriesMeta;
    }
    function extractExportAs(exportAs) {
        return void 0 === exportAs ? null : exportAs.split(",").map(function(part) {
            return part.trim();
        });
    }
    function isContentQuery(value) {
        var name = value.ngMetadataName;
        return "ContentChild" === name || "ContentChildren" === name;
    }
    function isViewQuery(value) {
        var name = value.ngMetadataName;
        return "ViewChild" === name || "ViewChildren" === name;
    }
    function isInputAnn(value) {
        return "Input" === value.ngMetadataName;
    }
    function splitByComma(value) {
        return value.split(",").map(function(piece) {
            return piece.trim();
        });
    }
    function compilePipe(type, meta) {
        var ngPipeDef = null;
        Object.defineProperty(type, NG_PIPE_DEF, {
            get: function() {
                if (null === ngPipeDef) {
                    var typeName_1 = type.name;
                    ngPipeDef = getCompilerFacade().compilePipe(angularCoreEnv, "ng:///" + typeName_1 + "/ngPipeDef.js", {
                        type: type,
                        typeArgumentCount: 0,
                        name: typeName_1,
                        deps: reflectDependencies(type),
                        pipeName: meta.name,
                        pure: void 0 === meta.pure || meta.pure
                    });
                }
                return ngPipeDef;
            },
            configurable: !1
        });
    }
    var Directive = makeDecorator("Directive", function(dir) {
        void 0 === dir && (dir = {});
        return dir;
    }, void 0, void 0, function(type, meta) {
        return SWITCH_COMPILE_DIRECTIVE(type, meta);
    }), SWITCH_COMPILE_COMPONENT = (makeDecorator("Component", function(c) {
        void 0 === c && (c = {});
        return Object.assign({
            changeDetection: ChangeDetectionStrategy.Default
        }, c);
    }, Directive, void 0, function(type, meta) {
        return SWITCH_COMPILE_COMPONENT(type, meta);
    }), makeDecorator("Pipe", function(p) {
        return Object.assign({
            pure: !0
        }, p);
    }, void 0, void 0, function(type, meta) {
        return SWITCH_COMPILE_PIPE(type, meta);
    }), makePropDecorator("Input", function(bindingPropertyName) {
        return {
            bindingPropertyName: bindingPropertyName
        };
    }), makePropDecorator("Output", function(bindingPropertyName) {
        return {
            bindingPropertyName: bindingPropertyName
        };
    }), makePropDecorator("HostBinding", function(hostPropertyName) {
        return {
            hostPropertyName: hostPropertyName
        };
    }), makePropDecorator("HostListener", function(eventName, args) {
        return {
            eventName: eventName,
            args: args
        };
    }), compileComponent), SWITCH_COMPILE_DIRECTIVE = compileDirective, SWITCH_COMPILE_PIPE = compilePipe, NgModule = makeDecorator("NgModule", function(ngModule) {
        return ngModule;
    }, void 0, void 0, function(type, meta) {
        return SWITCH_COMPILE_NGMODULE(type, meta);
    }), SWITCH_COMPILE_NGMODULE = compileNgModule;
    function multicast(subjectOrSubjectFactory, selector) {
        return function(source) {
            var subjectFactory;
            subjectFactory = "function" == typeof subjectOrSubjectFactory ? subjectOrSubjectFactory : function() {
                return subjectOrSubjectFactory;
            };
            if ("function" == typeof selector) return source.lift(new MulticastOperator(subjectFactory, selector));
            var connectable = Object.create(source, connectableObservableDescriptor);
            connectable.source = source;
            connectable.subjectFactory = subjectFactory;
            return connectable;
        };
    }
    var MulticastOperator = function() {
        function MulticastOperator(subjectFactory, selector) {
            this.subjectFactory = subjectFactory;
            this.selector = selector;
        }
        MulticastOperator.prototype.call = function(subscriber, source) {
            var selector = this.selector, subject = this.subjectFactory(), subscription = selector(subject).subscribe(subscriber);
            subscription.add(source.subscribe(subject));
            return subscription;
        };
        return MulticastOperator;
    }();
    function shareSubjectFactory() {
        return new Subject();
    }
    function share() {
        return function(source) {
            return refCount()(multicast(shareSubjectFactory)(source));
        };
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    var APP_INITIALIZER = new InjectionToken("Application Initializer"), ApplicationInitStatus = function() {
        function ApplicationInitStatus(appInits) {
            var _this = this;
            this.appInits = appInits;
            this.initialized = !1;
            this.done = !1;
            this.donePromise = new Promise(function(res, rej) {
                _this.resolve = res;
                _this.reject = rej;
            });
        }
        ApplicationInitStatus.prototype.runInitializers = function() {
            var _this = this;
            if (!this.initialized) {
                var asyncInitPromises = [], complete = function() {
                    _this.done = !0;
                    _this.resolve();
                };
                if (this.appInits) for (var i = 0; i < this.appInits.length; i++) {
                    var initResult = this.appInits[i]();
                    isPromise(initResult) && asyncInitPromises.push(initResult);
                }
                Promise.all(asyncInitPromises).then(function() {
                    complete();
                }).catch(function(e) {
                    _this.reject(e);
                });
                0 === asyncInitPromises.length && complete();
                this.initialized = !0;
            }
        };
        return ApplicationInitStatus;
    }();
    ApplicationInitStatus.decorators = [ {
        type: Injectable
    } ];
    ApplicationInitStatus.ctorParameters = function() {
        return [ {
            type: Array,
            decorators: [ {
                type: Inject,
                args: [ APP_INITIALIZER ]
            }, {
                type: Optional
            } ]
        } ];
    };
    ApplicationInitStatus.ngInjectableDef = ɵɵdefineInjectable({
        token: ApplicationInitStatus,
        factory: function(t) {
            return new (t || ApplicationInitStatus)(ɵɵinject(APP_INITIALIZER, 8));
        },
        providedIn: null
    });
    function _appIdRandomProviderFactory() {
        return "" + _randomChar() + _randomChar() + _randomChar();
    }
    var APP_ID_RANDOM_PROVIDER = {
        provide: new InjectionToken("AppId"),
        useFactory: _appIdRandomProviderFactory,
        deps: []
    };
    function _randomChar() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
    }
    var PLATFORM_INITIALIZER = new InjectionToken("Platform Initializer"), PLATFORM_ID = new InjectionToken("Platform ID"), APP_BOOTSTRAP_LISTENER = new InjectionToken("appBootstrapListener"), Console = (new InjectionToken("Application Packages Root URL"), 
    function() {
        function Console() {}
        Console.prototype.log = function(message) {
            console.log(message);
        };
        Console.prototype.warn = function(message) {
            console.warn(message);
        };
        return Console;
    }());
    Console.decorators = [ {
        type: Injectable
    } ];
    Console.ngInjectableDef = ɵɵdefineInjectable({
        token: Console,
        factory: function(t) {
            return new (t || Console)();
        },
        providedIn: null
    });
    var LOCALE_ID$1 = new InjectionToken("LocaleId"), ModuleWithComponentFactories = (new InjectionToken("Translations"), 
    new InjectionToken("TranslationsFormat"), function() {
        function ModuleWithComponentFactories(ngModuleFactory, componentFactories) {
            this.ngModuleFactory = ngModuleFactory;
            this.componentFactories = componentFactories;
        }
        return ModuleWithComponentFactories;
    }()), Compiler_compileModuleSync__POST_R3__ = function(moduleType) {
        return new NgModuleFactory$1(moduleType);
    }, Compiler_compileModuleSync = Compiler_compileModuleSync__POST_R3__, Compiler_compileModuleAsync = function(moduleType) {
        return Promise.resolve(Compiler_compileModuleSync__POST_R3__(moduleType));
    }, Compiler_compileModuleAndAllComponentsSync__POST_R3__ = function(moduleType) {
        var ngModuleFactory = Compiler_compileModuleSync__POST_R3__(moduleType), componentFactories = maybeUnwrapFn(getNgModuleDef(moduleType).declarations).reduce(function(factories, declaration) {
            var componentDef = getComponentDef(declaration);
            componentDef && factories.push(new ComponentFactory$1(componentDef));
            return factories;
        }, []);
        return new ModuleWithComponentFactories(ngModuleFactory, componentFactories);
    }, Compiler_compileModuleAndAllComponentsSync = Compiler_compileModuleAndAllComponentsSync__POST_R3__, Compiler_compileModuleAndAllComponentsAsync = function(moduleType) {
        return Promise.resolve(Compiler_compileModuleAndAllComponentsSync__POST_R3__(moduleType));
    }, Compiler = function() {
        function Compiler() {
            this.compileModuleSync = Compiler_compileModuleSync;
            this.compileModuleAsync = Compiler_compileModuleAsync;
            this.compileModuleAndAllComponentsSync = Compiler_compileModuleAndAllComponentsSync;
            this.compileModuleAndAllComponentsAsync = Compiler_compileModuleAndAllComponentsAsync;
        }
        Compiler.prototype.clearCache = function() {};
        Compiler.prototype.clearCacheFor = function(type) {};
        Compiler.prototype.getModuleId = function(moduleType) {};
        return Compiler;
    }();
    Compiler.decorators = [ {
        type: Injectable
    } ];
    Compiler.ngInjectableDef = ɵɵdefineInjectable({
        token: Compiler,
        factory: function(t) {
            return new (t || Compiler)();
        },
        providedIn: null
    });
    var trace, events, COMPILER_OPTIONS = new InjectionToken("compilerOptions");
    function detectWTF() {
        var wtf = _global.wtf;
        if (wtf && (trace = wtf.trace)) {
            events = trace.events;
            return !0;
        }
        return !1;
    }
    function createScope(signature, flags) {
        void 0 === flags && (flags = null);
        return events.createScope(signature, flags);
    }
    function leave(scope, returnValue) {
        trace.leaveScope(scope, returnValue);
        return returnValue;
    }
    var wtfEnabled = detectWTF();
    function noopScope(arg0, arg1) {
        return null;
    }
    var wtfCreateScope = wtfEnabled ? createScope : function(signature, flags) {
        return noopScope;
    }, wtfLeave = wtfEnabled ? leave : function(s, r) {
        return r;
    }, promise = Promise.resolve(0);
    function scheduleMicroTask(fn) {
        "undefined" == typeof Zone ? promise.then(function() {
            fn && fn.apply(null, null);
        }) : Zone.current.scheduleMicroTask("scheduleMicrotask", fn);
    }
    var NgZone = function() {
        function NgZone(_b) {
            var _c = _b.enableLongStackTrace, enableLongStackTrace = void 0 !== _c && _c;
            this.hasPendingMicrotasks = !1;
            this.hasPendingMacrotasks = !1;
            this.isStable = !0;
            this.onUnstable = new EventEmitter(!1);
            this.onMicrotaskEmpty = new EventEmitter(!1);
            this.onStable = new EventEmitter(!1);
            this.onError = new EventEmitter(!1);
            if ("undefined" == typeof Zone) throw new Error("In this configuration Angular requires Zone.js");
            Zone.assertZonePatched();
            var self = this;
            self._nesting = 0;
            self._outer = self._inner = Zone.current;
            Zone.wtfZoneSpec && (self._inner = self._inner.fork(Zone.wtfZoneSpec));
            Zone.TaskTrackingZoneSpec && (self._inner = self._inner.fork(new Zone.TaskTrackingZoneSpec()));
            enableLongStackTrace && Zone.longStackTraceZoneSpec && (self._inner = self._inner.fork(Zone.longStackTraceZoneSpec));
            forkInnerZoneWithAngularBehavior(self);
        }
        NgZone.isInAngularZone = function() {
            return !0 === Zone.current.get("isAngularZone");
        };
        NgZone.assertInAngularZone = function() {
            if (!NgZone.isInAngularZone()) throw new Error("Expected to be in Angular Zone, but it is not!");
        };
        NgZone.assertNotInAngularZone = function() {
            if (NgZone.isInAngularZone()) throw new Error("Expected to not be in Angular Zone, but it is!");
        };
        NgZone.prototype.run = function(fn, applyThis, applyArgs) {
            return this._inner.run(fn, applyThis, applyArgs);
        };
        NgZone.prototype.runTask = function(fn, applyThis, applyArgs, name) {
            var zone = this._inner, task = zone.scheduleEventTask("NgZoneEvent: " + name, fn, EMPTY_PAYLOAD, noop$1, noop$1);
            try {
                return zone.runTask(task, applyThis, applyArgs);
            } finally {
                zone.cancelTask(task);
            }
        };
        NgZone.prototype.runGuarded = function(fn, applyThis, applyArgs) {
            return this._inner.runGuarded(fn, applyThis, applyArgs);
        };
        NgZone.prototype.runOutsideAngular = function(fn) {
            return this._outer.run(fn);
        };
        return NgZone;
    }();
    function noop$1() {}
    var EMPTY_PAYLOAD = {};
    function checkStable(zone) {
        if (0 == zone._nesting && !zone.hasPendingMicrotasks && !zone.isStable) try {
            zone._nesting++;
            zone.onMicrotaskEmpty.emit(null);
        } finally {
            zone._nesting--;
            if (!zone.hasPendingMicrotasks) try {
                zone.runOutsideAngular(function() {
                    return zone.onStable.emit(null);
                });
            } finally {
                zone.isStable = !0;
            }
        }
    }
    function forkInnerZoneWithAngularBehavior(zone) {
        zone._inner = zone._inner.fork({
            name: "angular",
            properties: {
                isAngularZone: !0
            },
            onInvokeTask: function(delegate, current, target, task, applyThis, applyArgs) {
                try {
                    onEnter(zone);
                    return delegate.invokeTask(target, task, applyThis, applyArgs);
                } finally {
                    onLeave(zone);
                }
            },
            onInvoke: function(delegate, current, target, callback, applyThis, applyArgs, source) {
                try {
                    onEnter(zone);
                    return delegate.invoke(target, callback, applyThis, applyArgs, source);
                } finally {
                    onLeave(zone);
                }
            },
            onHasTask: function(delegate, current, target, hasTaskState) {
                delegate.hasTask(target, hasTaskState);
                if (current === target) if ("microTask" == hasTaskState.change) {
                    zone.hasPendingMicrotasks = hasTaskState.microTask;
                    checkStable(zone);
                } else "macroTask" == hasTaskState.change && (zone.hasPendingMacrotasks = hasTaskState.macroTask);
            },
            onHandleError: function(delegate, current, target, error) {
                delegate.handleError(target, error);
                zone.runOutsideAngular(function() {
                    return zone.onError.emit(error);
                });
                return !1;
            }
        });
    }
    function onEnter(zone) {
        zone._nesting++;
        if (zone.isStable) {
            zone.isStable = !1;
            zone.onUnstable.emit(null);
        }
    }
    function onLeave(zone) {
        zone._nesting--;
        checkStable(zone);
    }
    var NoopNgZone = function() {
        function NoopNgZone() {
            this.hasPendingMicrotasks = !1;
            this.hasPendingMacrotasks = !1;
            this.isStable = !0;
            this.onUnstable = new EventEmitter();
            this.onMicrotaskEmpty = new EventEmitter();
            this.onStable = new EventEmitter();
            this.onError = new EventEmitter();
        }
        NoopNgZone.prototype.run = function(fn) {
            return fn();
        };
        NoopNgZone.prototype.runGuarded = function(fn) {
            return fn();
        };
        NoopNgZone.prototype.runOutsideAngular = function(fn) {
            return fn();
        };
        NoopNgZone.prototype.runTask = function(fn) {
            return fn();
        };
        return NoopNgZone;
    }(), Testability = function() {
        function Testability(_ngZone) {
            var _this = this;
            this._ngZone = _ngZone;
            this._pendingCount = 0;
            this._isZoneStable = !0;
            this._didWork = !1;
            this._callbacks = [];
            this.taskTrackingZone = null;
            this._watchAngularEvents();
            _ngZone.run(function() {
                _this.taskTrackingZone = "undefined" == typeof Zone ? null : Zone.current.get("TaskTrackingZone");
            });
        }
        Testability.prototype._watchAngularEvents = function() {
            var _this = this;
            this._ngZone.onUnstable.subscribe({
                next: function() {
                    _this._didWork = !0;
                    _this._isZoneStable = !1;
                }
            });
            this._ngZone.runOutsideAngular(function() {
                _this._ngZone.onStable.subscribe({
                    next: function() {
                        NgZone.assertNotInAngularZone();
                        scheduleMicroTask(function() {
                            _this._isZoneStable = !0;
                            _this._runCallbacksIfReady();
                        });
                    }
                });
            });
        };
        Testability.prototype.increasePendingRequestCount = function() {
            this._pendingCount += 1;
            this._didWork = !0;
            return this._pendingCount;
        };
        Testability.prototype.decreasePendingRequestCount = function() {
            this._pendingCount -= 1;
            if (this._pendingCount < 0) throw new Error("pending async requests below zero");
            this._runCallbacksIfReady();
            return this._pendingCount;
        };
        Testability.prototype.isStable = function() {
            return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks;
        };
        Testability.prototype._runCallbacksIfReady = function() {
            var _this = this;
            if (this.isStable()) scheduleMicroTask(function() {
                for (;0 !== _this._callbacks.length; ) {
                    var cb = _this._callbacks.pop();
                    clearTimeout(cb.timeoutId);
                    cb.doneCb(_this._didWork);
                }
                _this._didWork = !1;
            }); else {
                var pending_1 = this.getPendingTasks();
                this._callbacks = this._callbacks.filter(function(cb) {
                    if (cb.updateCb && cb.updateCb(pending_1)) {
                        clearTimeout(cb.timeoutId);
                        return !1;
                    }
                    return !0;
                });
                this._didWork = !0;
            }
        };
        Testability.prototype.getPendingTasks = function() {
            return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(function(t) {
                return {
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data
                };
            }) : [];
        };
        Testability.prototype.addCallback = function(cb, timeout, updateCb) {
            var _this = this, timeoutId = -1;
            timeout && timeout > 0 && (timeoutId = setTimeout(function() {
                _this._callbacks = _this._callbacks.filter(function(cb) {
                    return cb.timeoutId !== timeoutId;
                });
                cb(_this._didWork, _this.getPendingTasks());
            }, timeout));
            this._callbacks.push({
                doneCb: cb,
                timeoutId: timeoutId,
                updateCb: updateCb
            });
        };
        Testability.prototype.whenStable = function(doneCb, timeout, updateCb) {
            if (updateCb && !this.taskTrackingZone) throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?');
            this.addCallback(doneCb, timeout, updateCb);
            this._runCallbacksIfReady();
        };
        Testability.prototype.getPendingRequestCount = function() {
            return this._pendingCount;
        };
        Testability.prototype.findProviders = function(using, provider, exactMatch) {
            return [];
        };
        return Testability;
    }();
    Testability.decorators = [ {
        type: Injectable
    } ];
    Testability.ctorParameters = function() {
        return [ {
            type: NgZone
        } ];
    };
    Testability.ngInjectableDef = ɵɵdefineInjectable({
        token: Testability,
        factory: function(t) {
            return new (t || Testability)(ɵɵinject(NgZone));
        },
        providedIn: null
    });
    var TestabilityRegistry = function() {
        function TestabilityRegistry() {
            this._applications = new Map();
            _testabilityGetter.addToWindow(this);
        }
        TestabilityRegistry.prototype.registerApplication = function(token, testability) {
            this._applications.set(token, testability);
        };
        TestabilityRegistry.prototype.unregisterApplication = function(token) {
            this._applications.delete(token);
        };
        TestabilityRegistry.prototype.unregisterAllApplications = function() {
            this._applications.clear();
        };
        TestabilityRegistry.prototype.getTestability = function(elem) {
            return this._applications.get(elem) || null;
        };
        TestabilityRegistry.prototype.getAllTestabilities = function() {
            return Array.from(this._applications.values());
        };
        TestabilityRegistry.prototype.getAllRootElements = function() {
            return Array.from(this._applications.keys());
        };
        TestabilityRegistry.prototype.findTestabilityInTree = function(elem, findInAncestors) {
            void 0 === findInAncestors && (findInAncestors = !0);
            return _testabilityGetter.findTestabilityInTree(this, elem, findInAncestors);
        };
        return TestabilityRegistry;
    }();
    TestabilityRegistry.decorators = [ {
        type: Injectable
    } ];
    TestabilityRegistry.ctorParameters = function() {
        return [];
    };
    TestabilityRegistry.ngInjectableDef = ɵɵdefineInjectable({
        token: TestabilityRegistry,
        factory: function(t) {
            return new (t || TestabilityRegistry)();
        },
        providedIn: null
    });
    var _platform, _testabilityGetter = new (function() {
        function _NoopGetTestability() {}
        _NoopGetTestability.prototype.addToWindow = function(registry) {};
        _NoopGetTestability.prototype.findTestabilityInTree = function(registry, elem, findInAncestors) {
            return null;
        };
        return _NoopGetTestability;
    }())(), compileNgModuleFactory = compileNgModuleFactory__POST_R3__;
    function compileNgModuleFactory__POST_R3__(injector, options, moduleType) {
        var moduleFactory = new NgModuleFactory$1(moduleType);
        if (isComponentResourceResolutionQueueEmpty()) return Promise.resolve(moduleFactory);
        var compilerProviders = _mergeArrays(injector.get(COMPILER_OPTIONS, []).concat(options).map(function(o) {
            return o.providers;
        }));
        if (0 === compilerProviders.length) return Promise.resolve(moduleFactory);
        var compiler = getCompilerFacade(), resourceLoader = Injector.create({
            providers: compilerProviders
        }).get(compiler.ResourceLoader);
        return resolveComponentResources(function(url) {
            return Promise.resolve(resourceLoader.get(url));
        }).then(function() {
            return moduleFactory;
        });
    }
    var isBoundToModule = isBoundToModule__POST_R3__;
    function isBoundToModule__POST_R3__(cf) {
        return cf.isBoundToModule;
    }
    var ALLOW_MULTIPLE_PLATFORMS = new InjectionToken("AllowMultipleToken");
    function createPlatform(injector) {
        if (_platform && !_platform.destroyed && !_platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, !1)) throw new Error("There can be only one platform. Destroy the previous one to create a new one.");
        _platform = injector.get(PlatformRef);
        var inits = injector.get(PLATFORM_INITIALIZER, null);
        inits && inits.forEach(function(init) {
            return init();
        });
        return _platform;
    }
    function createPlatformFactory(parentPlatformFactory, name, providers) {
        void 0 === providers && (providers = []);
        var desc = "Platform: " + name, marker = new InjectionToken(desc);
        return function(extraProviders) {
            void 0 === extraProviders && (extraProviders = []);
            var platform = getPlatform();
            if (!platform || platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, !1)) if (parentPlatformFactory) parentPlatformFactory(providers.concat(extraProviders).concat({
                provide: marker,
                useValue: !0
            })); else {
                var injectedProviders = providers.concat(extraProviders).concat({
                    provide: marker,
                    useValue: !0
                });
                createPlatform(Injector.create({
                    providers: injectedProviders,
                    name: desc
                }));
            }
            return assertPlatform(marker);
        };
    }
    function assertPlatform(requiredToken) {
        var platform = getPlatform();
        if (!platform) throw new Error("No platform exists!");
        if (!platform.injector.get(requiredToken, null)) throw new Error("A platform with a different configuration has been created. Please destroy it first.");
        return platform;
    }
    function getPlatform() {
        return _platform && !_platform.destroyed ? _platform : null;
    }
    var PlatformRef = function() {
        function PlatformRef(_injector) {
            this._injector = _injector;
            this._modules = [];
            this._destroyListeners = [];
            this._destroyed = !1;
        }
        PlatformRef.prototype.bootstrapModuleFactory = function(moduleFactory, options) {
            var _this = this, ngZone = getNgZone(options ? options.ngZone : void 0), providers = [ {
                provide: NgZone,
                useValue: ngZone
            } ];
            return ngZone.run(function() {
                var ngZoneInjector = Injector.create({
                    providers: providers,
                    parent: _this.injector,
                    name: moduleFactory.moduleType.name
                }), moduleRef = moduleFactory.create(ngZoneInjector), exceptionHandler = moduleRef.injector.get(ErrorHandler, null);
                if (!exceptionHandler) throw new Error("No ErrorHandler. Is platform module (BrowserModule) included?");
                setLocaleId(moduleRef.injector.get(LOCALE_ID$1, DEFAULT_LOCALE_ID));
                moduleRef.onDestroy(function() {
                    return remove(_this._modules, moduleRef);
                });
                ngZone.runOutsideAngular(function() {
                    return ngZone.onError.subscribe({
                        next: function(error) {
                            exceptionHandler.handleError(error);
                        }
                    });
                });
                return _callAndReportToErrorHandler(exceptionHandler, ngZone, function() {
                    var initStatus = moduleRef.injector.get(ApplicationInitStatus);
                    initStatus.runInitializers();
                    return initStatus.donePromise.then(function() {
                        _this._moduleDoBootstrap(moduleRef);
                        return moduleRef;
                    });
                });
            });
        };
        PlatformRef.prototype.bootstrapModule = function(moduleType, compilerOptions) {
            var _this = this;
            void 0 === compilerOptions && (compilerOptions = []);
            var options = optionsReducer({}, compilerOptions);
            return compileNgModuleFactory(this.injector, options, moduleType).then(function(moduleFactory) {
                return _this.bootstrapModuleFactory(moduleFactory, options);
            });
        };
        PlatformRef.prototype._moduleDoBootstrap = function(moduleRef) {
            var appRef = moduleRef.injector.get(ApplicationRef);
            if (moduleRef._bootstrapComponents.length > 0) moduleRef._bootstrapComponents.forEach(function(f) {
                return appRef.bootstrap(f);
            }); else {
                if (!moduleRef.instance.ngDoBootstrap) throw new Error("The module " + stringify(moduleRef.instance.constructor) + ' was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.');
                moduleRef.instance.ngDoBootstrap(appRef);
            }
            this._modules.push(moduleRef);
        };
        PlatformRef.prototype.onDestroy = function(callback) {
            this._destroyListeners.push(callback);
        };
        Object.defineProperty(PlatformRef.prototype, "injector", {
            get: function() {
                return this._injector;
            },
            enumerable: !0,
            configurable: !0
        });
        PlatformRef.prototype.destroy = function() {
            if (this._destroyed) throw new Error("The platform has already been destroyed!");
            this._modules.slice().forEach(function(module) {
                return module.destroy();
            });
            this._destroyListeners.forEach(function(listener) {
                return listener();
            });
            this._destroyed = !0;
        };
        Object.defineProperty(PlatformRef.prototype, "destroyed", {
            get: function() {
                return this._destroyed;
            },
            enumerable: !0,
            configurable: !0
        });
        return PlatformRef;
    }();
    PlatformRef.decorators = [ {
        type: Injectable
    } ];
    PlatformRef.ctorParameters = function() {
        return [ {
            type: Injector
        } ];
    };
    PlatformRef.ngInjectableDef = ɵɵdefineInjectable({
        token: PlatformRef,
        factory: function(t) {
            return new (t || PlatformRef)(ɵɵinject(Injector));
        },
        providedIn: null
    });
    function getNgZone(ngZoneOption) {
        return "noop" === ngZoneOption ? new NoopNgZone() : ("zone.js" === ngZoneOption ? void 0 : ngZoneOption) || new NgZone({
            enableLongStackTrace: isDevMode()
        });
    }
    function _callAndReportToErrorHandler(errorHandler, ngZone, callback) {
        try {
            var result = callback();
            return isPromise(result) ? result.catch(function(e) {
                ngZone.runOutsideAngular(function() {
                    return errorHandler.handleError(e);
                });
                throw e;
            }) : result;
        } catch (e) {
            ngZone.runOutsideAngular(function() {
                return errorHandler.handleError(e);
            });
            throw e;
        }
    }
    function optionsReducer(dst, objs) {
        return Array.isArray(objs) ? objs.reduce(optionsReducer, dst) : Object.assign({}, dst, objs);
    }
    var ApplicationRef = function() {
        function ApplicationRef(_zone, _console, _injector, _exceptionHandler, _componentFactoryResolver, _initStatus) {
            var _this = this;
            this._zone = _zone;
            this._console = _console;
            this._injector = _injector;
            this._exceptionHandler = _exceptionHandler;
            this._componentFactoryResolver = _componentFactoryResolver;
            this._initStatus = _initStatus;
            this._bootstrapListeners = [];
            this._views = [];
            this._runningTick = !1;
            this._enforceNoNewChanges = !1;
            this._stable = !0;
            this.componentTypes = [];
            this.components = [];
            this._enforceNoNewChanges = isDevMode();
            this._zone.onMicrotaskEmpty.subscribe({
                next: function() {
                    _this._zone.run(function() {
                        _this.tick();
                    });
                }
            });
            var isCurrentlyStable = new Observable(function(observer) {
                _this._stable = _this._zone.isStable && !_this._zone.hasPendingMacrotasks && !_this._zone.hasPendingMicrotasks;
                _this._zone.runOutsideAngular(function() {
                    observer.next(_this._stable);
                    observer.complete();
                });
            }), isStable = new Observable(function(observer) {
                var stableSub;
                _this._zone.runOutsideAngular(function() {
                    stableSub = _this._zone.onStable.subscribe(function() {
                        NgZone.assertNotInAngularZone();
                        scheduleMicroTask(function() {
                            if (!_this._stable && !_this._zone.hasPendingMacrotasks && !_this._zone.hasPendingMicrotasks) {
                                _this._stable = !0;
                                observer.next(!0);
                            }
                        });
                    });
                });
                var unstableSub = _this._zone.onUnstable.subscribe(function() {
                    NgZone.assertInAngularZone();
                    if (_this._stable) {
                        _this._stable = !1;
                        _this._zone.runOutsideAngular(function() {
                            observer.next(!1);
                        });
                    }
                });
                return function() {
                    stableSub.unsubscribe();
                    unstableSub.unsubscribe();
                };
            });
            this.isStable = merge$1(isCurrentlyStable, isStable.pipe(share()));
        }
        ApplicationRef.prototype.bootstrap = function(componentOrFactory, rootSelectorOrNode) {
            var componentFactory, _this = this;
            if (!this._initStatus.done) throw new Error("Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.");
            componentFactory = componentOrFactory instanceof ComponentFactory ? componentOrFactory : this._componentFactoryResolver.resolveComponentFactory(componentOrFactory);
            this.componentTypes.push(componentFactory.componentType);
            var ngModule = isBoundToModule(componentFactory) ? null : this._injector.get(NgModuleRef), compRef = componentFactory.create(Injector.NULL, [], rootSelectorOrNode || componentFactory.selector, ngModule);
            compRef.onDestroy(function() {
                _this._unloadComponent(compRef);
            });
            var testability = compRef.injector.get(Testability, null);
            testability && compRef.injector.get(TestabilityRegistry).registerApplication(compRef.location.nativeElement, testability);
            this._loadComponent(compRef);
            isDevMode() && this._console.log("Angular is running in the development mode. Call enableProdMode() to enable the production mode.");
            return compRef;
        };
        ApplicationRef.prototype.tick = function() {
            var _this = this;
            if (this._runningTick) throw new Error("ApplicationRef.tick is called recursively");
            var scope = ApplicationRef._tickScope();
            try {
                this._runningTick = !0;
                for (var _i = 0, _b = this._views; _i < _b.length; _i++) _b[_i].detectChanges();
                if (this._enforceNoNewChanges) for (var _c = 0, _d = this._views; _c < _d.length; _c++) _d[_c].checkNoChanges();
            } catch (e) {
                this._zone.runOutsideAngular(function() {
                    return _this._exceptionHandler.handleError(e);
                });
            } finally {
                this._runningTick = !1;
                wtfLeave(scope);
            }
        };
        ApplicationRef.prototype.attachView = function(viewRef) {
            var view = viewRef;
            this._views.push(view);
            view.attachToAppRef(this);
        };
        ApplicationRef.prototype.detachView = function(viewRef) {
            var view = viewRef;
            remove(this._views, view);
            view.detachFromAppRef();
        };
        ApplicationRef.prototype._loadComponent = function(componentRef) {
            this.attachView(componentRef.hostView);
            this.tick();
            this.components.push(componentRef);
            this._injector.get(APP_BOOTSTRAP_LISTENER, []).concat(this._bootstrapListeners).forEach(function(listener) {
                return listener(componentRef);
            });
        };
        ApplicationRef.prototype._unloadComponent = function(componentRef) {
            this.detachView(componentRef.hostView);
            remove(this.components, componentRef);
        };
        ApplicationRef.prototype.ngOnDestroy = function() {
            this._views.slice().forEach(function(view) {
                return view.destroy();
            });
        };
        Object.defineProperty(ApplicationRef.prototype, "viewCount", {
            get: function() {
                return this._views.length;
            },
            enumerable: !0,
            configurable: !0
        });
        return ApplicationRef;
    }();
    ApplicationRef._tickScope = wtfCreateScope("ApplicationRef#tick()");
    ApplicationRef.decorators = [ {
        type: Injectable
    } ];
    ApplicationRef.ctorParameters = function() {
        return [ {
            type: NgZone
        }, {
            type: Console
        }, {
            type: Injector
        }, {
            type: ErrorHandler
        }, {
            type: ComponentFactoryResolver
        }, {
            type: ApplicationInitStatus
        } ];
    };
    ApplicationRef.ngInjectableDef = ɵɵdefineInjectable({
        token: ApplicationRef,
        factory: function(t) {
            return new (t || ApplicationRef)(ɵɵinject(NgZone), ɵɵinject(Console), ɵɵinject(Injector), ɵɵinject(ErrorHandler), ɵɵinject(ComponentFactoryResolver), ɵɵinject(ApplicationInitStatus));
        },
        providedIn: null
    });
    function remove(list, el) {
        var index = list.indexOf(el);
        index > -1 && list.splice(index, 1);
    }
    function _mergeArrays(parts) {
        var result = [];
        parts.forEach(function(part) {
            return part && result.push.apply(result, part);
        });
        return result;
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */    var ivyEnabled = !0, _SEPARATOR = "#", FACTORY_CLASS_SUFFIX = "NgFactory", SystemJsNgModuleLoaderConfig = function() {
        function SystemJsNgModuleLoaderConfig() {}
        return SystemJsNgModuleLoaderConfig;
    }(), DEFAULT_CONFIG = {
        factoryPathPrefix: "",
        factoryPathSuffix: ".ngfactory"
    }, SystemJsNgModuleLoader = function() {
        function SystemJsNgModuleLoader(_compiler, config) {
            this._compiler = _compiler;
            this._config = config || DEFAULT_CONFIG;
        }
        SystemJsNgModuleLoader.prototype.load = function(path) {
            return !ivyEnabled && this._compiler instanceof Compiler ? this.loadFactory(path) : this.loadAndCompile(path);
        };
        SystemJsNgModuleLoader.prototype.loadAndCompile = function(path) {
            var _this = this, _b = path.split(_SEPARATOR), module = _b[0], exportName = _b[1];
            void 0 === exportName && (exportName = "default");
            return System.import(module).then(function(module) {
                return module[exportName];
            }).then(function(type) {
                return checkNotEmpty(type, module, exportName);
            }).then(function(type) {
                return _this._compiler.compileModuleAsync(type);
            });
        };
        SystemJsNgModuleLoader.prototype.loadFactory = function(path) {
            var _b = path.split(_SEPARATOR), module = _b[0], exportName = _b[1], factoryClassSuffix = FACTORY_CLASS_SUFFIX;
            if (void 0 === exportName) {
                exportName = "default";
                factoryClassSuffix = "";
            }
            return System.import(this._config.factoryPathPrefix + module + this._config.factoryPathSuffix).then(function(module) {
                return module[exportName + factoryClassSuffix];
            }).then(function(factory) {
                return checkNotEmpty(factory, module, exportName);
            });
        };
        return SystemJsNgModuleLoader;
    }();
    SystemJsNgModuleLoader.decorators = [ {
        type: Injectable
    } ];
    SystemJsNgModuleLoader.ctorParameters = function() {
        return [ {
            type: Compiler
        }, {
            type: SystemJsNgModuleLoaderConfig,
            decorators: [ {
                type: Optional
            } ]
        } ];
    };
    SystemJsNgModuleLoader.ngInjectableDef = ɵɵdefineInjectable({
        token: SystemJsNgModuleLoader,
        factory: function(t) {
            return new (t || SystemJsNgModuleLoader)(ɵɵinject(Compiler), ɵɵinject(SystemJsNgModuleLoaderConfig, 8));
        },
        providedIn: null
    });
    function checkNotEmpty(value, modulePath, exportName) {
        if (!value) throw new Error("Cannot find '" + exportName + "' in '" + modulePath + "'");
        return value;
    }
    createPlatformFactory(null, "core", [ {
        provide: PLATFORM_ID,
        useValue: "unknown"
    }, {
        provide: PlatformRef,
        deps: [ Injector ]
    }, {
        provide: TestabilityRegistry,
        deps: []
    }, {
        provide: Console,
        deps: []
    } ]);
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function _iterableDiffersFactory() {
        return defaultIterableDiffers;
    }
    function _keyValueDiffersFactory() {
        return defaultKeyValueDiffers;
    }
    function _localeFactory(locale) {
        return locale || "en-US";
    }
    var APPLICATION_MODULE_PROVIDERS = [ {
        provide: ApplicationRef,
        useClass: ApplicationRef,
        deps: [ NgZone, Console, Injector, ErrorHandler, ComponentFactoryResolver, ApplicationInitStatus ]
    }, {
        provide: SCHEDULER,
        deps: [ NgZone ],
        useFactory: zoneSchedulerFactory
    }, {
        provide: ApplicationInitStatus,
        useClass: ApplicationInitStatus,
        deps: [ [ new Optional(), APP_INITIALIZER ] ]
    }, {
        provide: Compiler,
        useClass: Compiler,
        deps: []
    }, APP_ID_RANDOM_PROVIDER, {
        provide: IterableDiffers,
        useFactory: _iterableDiffersFactory,
        deps: []
    }, {
        provide: KeyValueDiffers,
        useFactory: _keyValueDiffersFactory,
        deps: []
    }, {
        provide: LOCALE_ID$1,
        useFactory: _localeFactory,
        deps: [ [ new Inject(LOCALE_ID$1), new Optional(), new SkipSelf() ] ]
    } ];
    function zoneSchedulerFactory(ngZone) {
        var queue = [];
        ngZone.onStable.subscribe(function() {
            for (;queue.length; ) queue.pop()();
        });
        return function(fn) {
            queue.push(fn);
        };
    }
    var ApplicationModule = function() {
        function ApplicationModule(appRef) {}
        return ApplicationModule;
    }();
    ApplicationModule.decorators = [ {
        type: NgModule,
        args: [ {
            providers: APPLICATION_MODULE_PROVIDERS
        } ]
    } ];
    ApplicationModule.ctorParameters = function() {
        return [ {
            type: ApplicationRef
        } ];
    };
    ApplicationModule.ngModuleDef = ɵɵdefineNgModule({
        type: ApplicationModule
    });
    ApplicationModule.ngInjectorDef = ɵɵdefineInjector({
        factory: function(t) {
            return new (t || ApplicationModule)(ɵɵinject(ApplicationRef));
        },
        providers: APPLICATION_MODULE_PROVIDERS
    });
    var Dep = function() {
        function Dep() {}
        return Dep;
    }();
    Dep.ngInjectableDef = ɵɵdefineInjectable({
        factory: function() {
            return new Dep();
        }
    });
    var BaseClass = function() {
        function BaseClass(dep) {
            this.dep = dep;
        }
        return BaseClass;
    }();
    BaseClass.ngInjectableDef = ɵɵdefineInjectable({
        factory: function(t) {
            return new (t || BaseClass)(inject(Dep));
        }
    });
    var ChildClass = function(_super) {
        __extends(ChildClass, _super);
        function ChildClass() {
            return null !== _super && _super.apply(this, arguments) || this;
        }
        return ChildClass;
    }(BaseClass), InjectorDef = function() {
        function InjectorDef() {}
        return InjectorDef;
    }();
    InjectorDef.ngInjectorDef = ɵɵdefineInjector({
        factory: function() {
            return new InjectorDef();
        },
        providers: [ Dep, ChildClass ]
    });
window.onload = function() {
    var injector = createInjector(InjectorDef);
    var child = injector.get(ChildClass);
    if (!(child instanceof ChildClass)) {
        document.body.innerHTML = "<h1>Fail</h1>";
        throw new Error("fail!");
    }
    document.body.innerHTML = "<h1>Pass</h1>";
};
}();
