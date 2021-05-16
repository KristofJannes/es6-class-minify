import chai from "chai";
import ES6ClassMinify from "../src/index.js";

chai.should();

describe("es6-class-minify", () => {
  describe("Class methods", () => {
    describe("Class method declarations", () => {
      let es6ClassMinify;
      beforeEach(() => {
        es6ClassMinify = new ES6ClassMinify();
      });

      it("does't minify the constructor with 0 arguments", () => {
        const { code } = es6ClassMinify.minify("class A{constructor(){}}");
        code.should.equal("class A{constructor(){}}");
      });

      it("does't minify the constructor with 1 argument", () => {
        const { code } = es6ClassMinify.minify("class A{constructor(arg1){}}");
        code.should.equal("class A{constructor(arg1){}}");
      });

      it("does't minify the constructor with 2 arguments", () => {
        const { code } = es6ClassMinify.minify(
          "class A{constructor(arg1,arg2){}}"
        );
        code.should.equal("class A{constructor(arg1,arg2){}}");
      });

      it("minifies class method declarations with 0 arguments", () => {
        const { code } = es6ClassMinify.minify("class A{_test(){}}");
        code.should.equal("class A{a(){}}");
      });

      it("minifies class method declarations with 1 argument", () => {
        const { code } = es6ClassMinify.minify("class A{_test(arg1){}}");
        code.should.equal("class A{a(arg1){}}");
      });

      it("minifies class method declarations with 2 arguments", () => {
        const { code } = es6ClassMinify.minify("class A{_test(arg1,arg2){}}");
        code.should.equal("class A{a(arg1,arg2){}}");
      });

      it("minifies multiple class method declarations", () => {
        const { code } = es6ClassMinify.minify("class A{_test(){}_method(){}}");
        code.should.equal("class A{a(){}b(){}}");
      });

      it("minifies many class method declarations", () => {
        const { code } = es6ClassMinify.minify(
          "class A{_method1(){}_method2(){}_method3(){}_method4(){}_method5(){}_method6(){}_method7(){}_method8(){}_method9(){}_method10(){}_method11(){}_method12(){}_method13(){}_method14(){}_method15(){}_method16(){}_method17(){}_method18(){}_method19(){}_method20(){}_method21(){}_method22(){}_method23(){}_method24(){}_method25(){}_method26(){}_method27(){}_method28(){}_method29(){}_method30(){}_method31(){}_method32(){}_method33(){}_method34(){}_method35(){}_method36(){}_method37(){}_method38(){}_method39(){}_method40(){}_method41(){}_method42(){}_method43(){}_method44(){}_method45(){}_method46(){}_method47(){}_method48(){}_method49(){}_method50(){}_method51(){}_method52(){}_method53(){}_method54(){}_method55(){}_method56(){}_method57(){}_method58(){}_method59(){}_method60(){}_method61(){}_method62(){}_method63(){}_method64(){}_method65(){}_method66(){}_method67(){}_method68(){}_method69(){}_method70(){}_method71(){}_method72(){}_method73(){}_method74(){}_method75(){}_method76(){}_method77(){}_method78(){}_method79(){}_method80(){}_method81(){}_method82(){}_method83(){}_method84(){}_method85(){}_method86(){}_method87(){}_method88(){}_method89(){}_method90(){}_method91(){}_method92(){}_method93(){}_method94(){}_method95(){}_method96(){}_method97(){}_method98(){}_method99(){}_method100(){}_method101(){}_method102(){}_method103(){}_method104(){}_method105(){}}"
        );
        code.should.equal(
          "class A{a(){}b(){}c(){}d(){}e(){}f(){}g(){}h(){}i(){}j(){}k(){}l(){}m(){}n(){}o(){}p(){}q(){}r(){}s(){}t(){}u(){}v(){}w(){}x(){}y(){}z(){}A(){}B(){}C(){}D(){}E(){}F(){}G(){}H(){}I(){}J(){}K(){}L(){}M(){}N(){}O(){}P(){}Q(){}R(){}S(){}T(){}U(){}V(){}W(){}X(){}Y(){}Z(){}aa(){}ab(){}ac(){}ad(){}ae(){}af(){}ag(){}ah(){}ai(){}aj(){}ak(){}al(){}am(){}an(){}ao(){}ap(){}aq(){}ar(){}as(){}at(){}au(){}av(){}aw(){}ax(){}ay(){}az(){}aA(){}aB(){}aC(){}aD(){}aE(){}aF(){}aG(){}aH(){}aI(){}aJ(){}aK(){}aL(){}aM(){}aN(){}aO(){}aP(){}aQ(){}aR(){}aS(){}aT(){}aU(){}aV(){}aW(){}aX(){}aY(){}aZ(){}ba(){}}"
        );
      });
    });

    describe("Class method access", () => {
      let es6ClassMinify;
      beforeEach(() => {
        es6ClassMinify = new ES6ClassMinify();
        es6ClassMinify.minify("class A{test(){}}");
      });

      it("minifies class method access with 0 arguments", () => {
        const { code } = es6ClassMinify.minify("a._test()");
        code.should.equal("a.a()");
      });

      it("minifies class method access with 1 argument", () => {
        const { code } = es6ClassMinify.minify("a._test(0)");
        code.should.equal("a.a(0)");
      });

      it("minifies class method access with 2 arguments", () => {
        const { code } = es6ClassMinify.minify("a._test(0, true)");
        code.should.equal("a.a(0, true)");
      });

      it("minifies class method access on this", () => {
        const { code } = es6ClassMinify.minify("this._test()");
        code.should.equal("this.a()");
      });

      it("minifies class method access with complex arguments (1)", () => {
        const { code } = es6ClassMinify.minify("this._test(new Uint8Array(5))");
        code.should.equal("this.a(new Uint8Array(5))");
      });

      it("minifies class method access with complex arguments (2)", () => {
        const { code } = es6ClassMinify.minify(
          "this._test(await this.call(new Uint8Array(0x8)))"
        );
        code.should.equal("this.a(await this.call(new Uint8Array(0x8)))");
      });

      it("minifies class method access with complex arguments (2)", () => {
        const { code } = es6ClassMinify.minify(
          "this._test(await this.call(new Uint8Array(0x8)))"
        );
        code.should.equal("this.a(await this.call(new Uint8Array(0x8)))");
      });

      it("minifies class method access for assignment", () => {
        const { code } = es6ClassMinify.minify("a._test=()=>{}");
        code.should.equal("a.a=()=>{}");
      });

      it("minifies class method access to assignment", () => {
        const { code } = es6ClassMinify.minify("const b=a._test;");
        code.should.equal("const b=a.a;");
      });
    });
  });

  describe("Class properties", () => {
    describe("Class property declarations", () => {
      let es6ClassMinify;
      beforeEach(() => {
        es6ClassMinify = new ES6ClassMinify();
      });

      it("minifies class properties", () => {
        const { code } = es6ClassMinify.minify(
          "class A{constructor(){this._test=0}}"
        );
        code.should.equal("class A{constructor(){this.a=0}}");
      });
    });

    describe("Class property access", () => {
      let es6ClassMinify;
      beforeEach(() => {
        es6ClassMinify = new ES6ClassMinify();
        es6ClassMinify.minify("class A{constructor(){this._test=0}};");
      });

      it("minifies class property assignment", async () => {
        const { code } = es6ClassMinify.minify("a._test=1;");
        code.should.equal("a.a=1;");
      });

      it("minifies class property indexing", async () => {
        const { code } = es6ClassMinify.minify("a._test[0]=1;");
        code.should.equal("a.a[0]=1;");
      });

      it("minifies class property calling", async () => {
        const { code } = es6ClassMinify.minify("a._test();");
        code.should.equal("a.a();");
      });

      it("minifies class property sub-property", async () => {
        const { code } = es6ClassMinify.minify("a._test.ok=!0;");
        code.should.equal("a.a.ok=!0;");
      });

      it("minifies class property access with comma", async () => {
        const { code } = es6ClassMinify.minify("const b=a._test,b;");
        code.should.equal("const b=a.a,b;");
      });

      it("minifies class property access with ++", async () => {
        const { code } = es6ClassMinify.minify("a._test++;");
        code.should.equal("a.a++;");
      });

      it("minifies class property access with --", async () => {
        const { code } = es6ClassMinify.minify("a._test--;");
        code.should.equal("a.a--;");
      });

      it("minifies class property access with +=", async () => {
        const { code } = es6ClassMinify.minify("a._test+=5;");
        code.should.equal("a.a+=5;");
      });

      it("minifies class property access with -=", async () => {
        const { code } = es6ClassMinify.minify("a._test-=5;");
        code.should.equal("a.a-=5;");
      });

      it("minifies class property access with )", async () => {
        const { code } = es6ClassMinify.minify("console.log(a._test);");
        code.should.equal("console.log(a.a);");
      });
    });
  });
});
