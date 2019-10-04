const _REF_ = Symbol();

function _filterKeys(key) {
    return !key.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/);
}

function _descriptor(proto, method) {
    let owner = proto;
    let descp = Reflect.getOwnPropertyDescriptor(owner, method);
    while (owner && descp === undefined && Reflect.ownKeys(Reflect.getPrototypeOf(owner)).indexOf('__proto__') === -1) {
        owner = Reflect.getPrototypeOf(owner);
        descp = Reflect.getOwnPropertyDescriptor(owner, method);
    }
    return descp;
}

function _applyMethod(method, traitProto, subject) {
    const alias = method;
    if (Reflect.ownKeys(subject).indexOf(alias) === -1) {
        Reflect.defineProperty(subject, alias, _descriptor(traitProto, method));
    }
}

function _raiseErrorIfItIsState(key, traitProto) {
    if (typeof traitProto[key] !== 'function') {
        throw new Error('Trait MUST NOT contain any state. Found: ' + key + ' as state while processing trait');
    }
}

function _reference() {
    return this[_REF_] || this;
}

function _keys(ref) {
    let proto = ref;
    let protoKeys = Reflect.ownKeys(ref);
    if (protoKeys.indexOf('constructor') === -1) {
        return Object.getOwnPropertyNames(ref);
    }
    while (proto && Reflect.ownKeys(Reflect.getPrototypeOf(proto)).indexOf('__proto__') === -1) {
        proto = Reflect.getPrototypeOf(proto);
        protoKeys = protoKeys.concat(Reflect.ownKeys(proto));
    }
    return protoKeys.filter((elem, index, self) => index == self.indexOf(elem));
}

function _apply(t) {
    const subject = this;
    const ref = _reference.call(t);
    const tp = ref.prototype || ref;
    _keys(tp).filter(_filterKeys).forEach(function (method) {
        _raiseErrorIfItIsState(method, tp);
        _applyMethod(method, tp, subject);
    });
}

function _addTrait(t) {
    _apply.call(this.prototype, t);
}

/**
 * @decorator Trait
 * Applies one or more traits as part of the target class.
 * @params Trait1, ...TraitN {Class|Object}
 * @usage @Trait(TExample) class MyClass {}
 */
function Trait() {
    let traitLen = arguments.length;
    let traitList = Array(traitLen);
    for (let _key = 0; _key < traitLen; _key++) {
        traitList[_key] = arguments[_key];
    }
    return function (target) {
        traitList.forEach(function (trait) {
            _addTrait.call(target, trait);
        });
    };
}

exports.Trait = Trait;
